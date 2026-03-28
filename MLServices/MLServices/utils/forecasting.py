

# # utils/forecasting.py
# from prophet import Prophet
# import pandas as pd
# from typing import List, Dict, Union, Any


# def forecast_next_month(
#     history: Union[List[Dict[str, Union[str, float]]], Dict[str, Dict[str, float]]],
#     periods: int = 3
# ) -> Union[List[Dict[str, Union[str, float]]], Dict[str, List[Dict[str, Any]]]]:
#     """
#     Perform multi-month forecasting.

#     - Single series (list of {date, amount}) -> list of next `periods` forecasts
#     - Multi-category (dict of category->{YYYY-MM: amount}) -> dict of category->list of forecasts
#     """
#     def _predict_series(df: pd.DataFrame) -> List[Dict[str, Union[str, float]]]:
#         model = Prophet(yearly_seasonality=True,
#                         weekly_seasonality=False,
#                         daily_seasonality=False)
#         model.fit(df)
#         future = model.make_future_dataframe(periods=periods, freq='MS')
#         forecast = model.predict(future)
#         preds = forecast[['ds', 'yhat']].tail(periods)
#         output = []
#         for _, row in preds.iterrows():
#             output.append({
#                 'date': row['ds'].date().isoformat(),
#                 'forecast': round(row['yhat'], 2)
#             })
#         return output

#     # single-series
#     if isinstance(history, list):
#         df = pd.DataFrame(history)
#         df['ds'] = pd.to_datetime(df['date'])
#         df['y'] = df['amount']
#         df = df[['ds', 'y']]
#         return _predict_series(df)

#     # multi-series
#     results: Dict[str, List[Dict[str, Any]]] = {}
#     for category, series in history.items():
#         df = pd.DataFrame([
#             {'ds': pd.to_datetime(f"{date_str}-01"), 'y': amount}
#             for date_str, amount in series.items()
#         ])
#         results[category] = _predict_series(df)
#     return results


# utils/forecasting.py
"""
Industrial-level time-series forecasting engine for personal finance data.

Architecture:
  - TimeSeriesPreprocessor   : cleaning, outlier capping, interpolation, feature engineering
  - ProphetForecaster        : Facebook Prophet with category-tuned hyperparameters
  - LinearTrendForecaster    : Fallback for sparse data (< MIN_POINTS_FOR_PROPHET months)
  - forecast_category()      : Full pipeline for a single spending category
  - forecast_all_categories(): Master function — takes full PeriodData history,
                                returns per-category + aggregate forecasts
"""

import warnings
warnings.filterwarnings("ignore")

import logging
import numpy as np
import pandas as pd
from prophet import Prophet
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
from typing import Dict, List, Any, Optional, Tuple

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
#  Category-specific Prophet configurations
#  Each category has different changepoint/seasonality behaviour in real life
# ─────────────────────────────────────────────────────────────────────────────

CATEGORY_CONFIGS: Dict[str, Dict] = {
    # Rent: almost never changes — very low changepoint sensitivity
    "Rent": {
        "changepoint_prior_scale": 0.001,
        "seasonality_prior_scale": 0.01,
        "yearly_seasonality": False,
    },
    # Groceries/Food: moderate growth, mild yearly seasonality (festive months)
    "Groceries": {
        "changepoint_prior_scale": 0.05,
        "seasonality_prior_scale": 0.1,
        "yearly_seasonality": True,
    },
    "Food": {
        "changepoint_prior_scale": 0.05,
        "seasonality_prior_scale": 0.1,
        "yearly_seasonality": True,
    },
    # Utilities: strong yearly seasonality (AC/heating cycles)
    "Utilities": {
        "changepoint_prior_scale": 0.1,
        "seasonality_prior_scale": 0.4,
        "yearly_seasonality": True,
        "iqr_multiplier": 1.5,   # ← add this, tighter capping

    },
    # Transport: moderate, slightly seasonal
    "Transport": {
        "changepoint_prior_scale": 0.1,
        "seasonality_prior_scale": 0.2,
        "yearly_seasonality": True,
    },
    # Entertainment: high volatility, strong seasonality
    "Entertainment": {
        "changepoint_prior_scale": 0.3,
        "seasonality_prior_scale": 0.5,
        "yearly_seasonality": True,
    },
    # Eating_Out: high variance
    "Eating_Out": {
        "changepoint_prior_scale": 0.2,
        "seasonality_prior_scale": 0.3,
        "yearly_seasonality": True,
    },
    # Loan repayments: very stable (fixed EMI)
    "Loan_Repayment": {
        "changepoint_prior_scale": 0.001,
        "seasonality_prior_scale": 0.01,
        "yearly_seasonality": False,
    },
    # Insurance: near-fixed
    "Insurance": {
        "changepoint_prior_scale": 0.001,
        "seasonality_prior_scale": 0.01,
        "yearly_seasonality": False,
    },
    # Healthcare: unpredictable spikes
    "Healthcare": {
        "changepoint_prior_scale": 0.4,
        "seasonality_prior_scale": 0.2,
        "yearly_seasonality": True,
    },
    # Miscellaneous / Other: high variance
    "Miscellaneous": {
        "changepoint_prior_scale": 0.3,
        "seasonality_prior_scale": 0.3,
        "yearly_seasonality": True,
    },
    "Other": {
        "changepoint_prior_scale": 0.3,
        "seasonality_prior_scale": 0.3,
        "yearly_seasonality": True,
    },
    # Default fallback
    "default": {
        "changepoint_prior_scale": 0.1,
        "seasonality_prior_scale": 0.2,
        "yearly_seasonality": True,
    },
}

MIN_POINTS_FOR_PROPHET = 6   # Minimum months needed to run Prophet reliably


# ─────────────────────────────────────────────────────────────────────────────
#  Preprocessor
# ─────────────────────────────────────────────────────────────────────────────

class TimeSeriesPreprocessor:
    """
    Handles:
      - IQR-based outlier capping
      - Missing month linear interpolation
      - Trend metric computation
    """

    def __init__(self, iqr_multiplier: float = 2.0):
        self.iqr_multiplier = iqr_multiplier

    def cap_outliers(self, series, multiplier=None):
        m = multiplier or self.iqr_multiplier
        Q1, Q3 = series.quantile(0.25), series.quantile(0.75)
        IQR = Q3 - Q1
        return series.clip(lower=Q1 - m * IQR, upper=Q3 + m * IQR)

    def interpolate_missing_months(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Resample to monthly start frequency, then linearly interpolate
        any months that have no recorded spending.
        """
        df = df.set_index("ds").resample("MS").mean()
        df["y"] = df["y"].interpolate(method="linear")
        df["y"] = df["y"].bfill().ffill()
        return df.reset_index()

    def compute_trend_metrics(self, series: pd.Series) -> Dict[str, Any]:
        """
        Returns:
          direction       : "increasing" | "decreasing" | "stable"
          avg_monthly_change_pct : average MoM % change
          volatility_pct  : std dev of MoM % changes
          overall_pct_change : first→last % change
        """
        if len(series) < 2:
            return {
                "direction": "stable",
                "avg_monthly_change_pct": 0.0,
                "volatility_pct": 0.0,
                "overall_pct_change": 0.0,
            }

        changes = series.pct_change().dropna()
        avg_change = float(changes.mean())
        volatility = float(changes.std()) if len(changes) > 1 else 0.0

        first, last = float(series.iloc[0]), float(series.iloc[-1])
        overall_pct = ((last - first) / (first + 1e-9)) * 100

        if avg_change > 0.02:
            direction = "increasing"
        elif avg_change < -0.02:
            direction = "decreasing"
        else:
            direction = "stable"

        return {
            "direction": direction,
            "avg_monthly_change_pct": round(avg_change * 100, 2),
            "volatility_pct": round(volatility * 100, 2),
            "overall_pct_change": round(overall_pct, 2),
        }


# ─────────────────────────────────────────────────────────────────────────────
#  Prophet Forecaster
# ─────────────────────────────────────────────────────────────────────────────

class ProphetForecaster:
    """
    Facebook Prophet wrapper with:
      - Category-specific hyperparameters
      - 90% confidence intervals
      - Optional quarterly seasonality
      - In-sample accuracy metrics
    """

    def __init__(self, category: str):
        self.category = category
        cfg = CATEGORY_CONFIGS.get(category, CATEGORY_CONFIGS["default"])
        self.model = Prophet(
            changepoint_prior_scale=cfg["changepoint_prior_scale"],
            seasonality_prior_scale=cfg["seasonality_prior_scale"],
            yearly_seasonality=cfg["yearly_seasonality"],
            weekly_seasonality=False,
            daily_seasonality=False,
            interval_width=0.90,
            uncertainty_samples=300,
        )
        self._fitted = False

    def fit(self, df: pd.DataFrame) -> "ProphetForecaster":
        # Add quarterly seasonality when enough data is present
        if len(df) >= 8:
            self.model.add_seasonality(
                name="quarterly", period=91.25, fourier_order=3
            )
        self.model.fit(df[["ds", "y"]])
        self._fitted = True
        return self

    def predict(self, periods: int) -> pd.DataFrame:
        future = self.model.make_future_dataframe(periods=periods, freq="MS")
        fc = self.model.predict(future)
        return fc[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(periods)

    def evaluate(self, df: pd.DataFrame) -> Dict[str, Any]:
        """In-sample MAE / MAPE / RMSE on historical data."""
        try:
            pred = self.model.predict(self.model.history)
            y_true = df["y"].values
            y_pred = pred["yhat"].values[: len(y_true)]
            mae  = mean_absolute_error(y_true, y_pred)
            mape = mean_absolute_percentage_error(y_true + 1e-9, y_pred + 1e-9) * 100
            rmse = float(np.sqrt(np.mean((y_true - y_pred) ** 2)))
            return {
                "mae": round(float(mae), 2),
                "mape": round(float(mape), 2),
                "rmse": round(rmse, 2),
                "model_used": "prophet",
            }
        except Exception as e:
            logger.warning(f"Evaluation failed for {self.category}: {e}")
            return {"mae": 0.0, "mape": 0.0, "rmse": 0.0, "model_used": "prophet"}


# ─────────────────────────────────────────────────────────────────────────────
#  Linear Trend Forecaster (fallback for < 6 data points)
# ─────────────────────────────────────────────────────────────────────────────

class LinearTrendForecaster:
    """
    OLS linear regression over time index as a simple but interpretable
    fallback when Prophet needs more data than available.
    Confidence interval = ±1.645 σ  (≈ 90% CI).
    """

    def __init__(self):
        self._model = LinearRegression()
        self._n = 0
        self._std = 0.0
        self._last_date = None

    def fit(self, df: pd.DataFrame) -> "LinearTrendForecaster":
        X = np.arange(len(df)).reshape(-1, 1)
        y = df["y"].values
        self._model.fit(X, y)
        self._n = len(df)
        residuals = y - self._model.predict(X)
        self._std = float(residuals.std()) if len(residuals) > 1 else float(y.std() or y.mean() * 0.1)
        self._last_date = df["ds"].iloc[-1]
        return self

    def predict(self, periods: int) -> pd.DataFrame:
        X_fut = np.arange(self._n, self._n + periods).reshape(-1, 1)
        yhat = np.maximum(self._model.predict(X_fut), 0.0)
        margin = 1.645 * self._std   # 90% CI
        future_dates = pd.date_range(
            start=self._last_date + pd.DateOffset(months=1),
            periods=periods,
            freq="MS",
        )
        return pd.DataFrame({
            "ds":         future_dates,
            "yhat":       yhat,
            "yhat_lower": np.maximum(yhat - margin, 0.0),
            "yhat_upper": yhat + margin,
        })

    def evaluate(self, df: pd.DataFrame) -> Dict[str, Any]:
        X = np.arange(len(df)).reshape(-1, 1)
        y_pred = self._model.predict(X)
        y_true = df["y"].values
        mae  = mean_absolute_error(y_true, y_pred)
        mape = mean_absolute_percentage_error(y_true + 1e-9, y_pred + 1e-9) * 100
        rmse = float(np.sqrt(np.mean((y_true - y_pred) ** 2)))
        return {
            "mae":        round(float(mae), 2),
            "mape":       round(float(mape), 2),
            "rmse":       round(rmse, 2),
            "model_used": "linear_trend",
            "note":       "Linear fallback — fewer than 6 months of data",
        }


# ─────────────────────────────────────────────────────────────────────────────
#  Single-category pipeline
# ─────────────────────────────────────────────────────────────────────────────

def forecast_category(
    category: str,
    series: Dict[str, float],   # { "YYYY-MM": amount }
    periods: int = 3,
) -> Dict[str, Any]:
    """
    Full forecasting pipeline for one spending category:
      1. Build DataFrame from series dict
      2. Interpolate any missing months
      3. Compute historical trend metrics (before outlier capping)
      4. Cap outliers to prevent skewed forecasts
      5. Select model: Prophet (≥6 pts) or LinearTrend (<6 pts)
      6. Fit, predict, evaluate
      7. Return structured result
    """
    preprocessor = TimeSeriesPreprocessor()

    # ── 1. Build DataFrame ────────────────────────────────────────────────
    records = [
        {"ds": pd.to_datetime(f"{m}-01"), "y": max(0.0, float(v))}
        for m, v in sorted(series.items())
    ]
    if not records:
        return _empty_forecast(category, periods)

    df = pd.DataFrame(records)

    # ── 2. Interpolate missing months ─────────────────────────────────────
    df = preprocessor.interpolate_missing_months(df)

    # ── 3. Historical trend (raw, before capping) ─────────────────────────
    trend_hist = preprocessor.compute_trend_metrics(df["y"])

    # ── 4. Cap outliers ───────────────────────────────────────────────────
    df["y"] = preprocessor.cap_outliers(df["y"])

    last_known  = round(float(df["y"].iloc[-1]), 2)
    avg_hist    = round(float(df["y"].mean()), 2)

    # ── 5. Model selection ────────────────────────────────────────────────
    use_prophet = len(df) >= MIN_POINTS_FOR_PROPHET

    try:
        if use_prophet:
            forecaster = ProphetForecaster(category)
            forecaster.fit(df)
            raw_fc = forecaster.predict(periods)
            metrics = forecaster.evaluate(df)
        else:
            forecaster = LinearTrendForecaster()
            forecaster.fit(df)
            raw_fc = forecaster.predict(periods)
            metrics = forecaster.evaluate(df)
    except Exception as exc:
        logger.warning(f"Primary model failed for {category} ({exc}), using linear fallback")
        forecaster = LinearTrendForecaster()
        forecaster.fit(df)
        raw_fc = forecaster.predict(periods)
        metrics = forecaster.evaluate(df)

    metrics["data_points_used"] = len(df)

    # ── 6. Build forecast points ──────────────────────────────────────────
    fc_points = []
    for _, row in raw_fc.iterrows():
        fc_points.append({
            "date":     row["ds"].strftime("%Y-%m"),
            "forecast": round(max(0.0, float(row["yhat"])), 2),
            "lower":    round(max(0.0, float(row["yhat_lower"])), 2),
            "upper":    round(max(0.0, float(row["yhat_upper"])), 2),
        })

    # ── 7. Forecast direction ─────────────────────────────────────────────
    forecast_dir = _forecast_direction(
        [p["forecast"] for p in fc_points], last_known
    )

    return {
        "category":         category,
        "forecasts":        fc_points,
        "trend": {
            **trend_hist,
            "forecast_direction": forecast_dir,
        },
        "metrics":          metrics,
        "last_known_value": last_known,
        "avg_historical":   avg_hist,
    }


# ─────────────────────────────────────────────────────────────────────────────
#  Master function — all categories + summary
# ─────────────────────────────────────────────────────────────────────────────

def forecast_all_categories(
    history: List[Dict],   # List of PeriodData dicts
    periods: int = 3,
) -> Dict[str, Any]:
    """
    Master entry point called by the /forecast API endpoint.

    Args:
        history : Chronologically ordered list of PeriodData-like dicts, each with:
                  { period, byCategory, totalExpense, totalIncome, netSavings }
        periods : Number of months to forecast ahead (default 3)

    Returns:
        {
          "forecasts": { category: CategoryForecast, ... },
          "summary":   SummaryForecast
        }
    """
    # ── Build per-category and macro series ──────────────────────────────
    per_cat:        Dict[str, Dict[str, float]] = {}
    total_expense:  Dict[str, float] = {}
    income_series:  Dict[str, float] = {}
    savings_series: Dict[str, float] = {}

    for period_data in history:
        month = period_data["period"]
        total_expense[month]  = float(period_data.get("totalExpense", 0))
        income_series[month]  = float(period_data.get("totalIncome",  0))
        savings_series[month] = float(period_data.get("netSavings",   0))
        for cat, amt in period_data.get("byCategory", {}).items():
            per_cat.setdefault(cat, {})[month] = float(amt)

    # ── Forecast every category ───────────────────────────────────────────
    results: Dict[str, Any] = {}
    for cat, series in per_cat.items():
        logger.info(f"Forecasting category: {cat} ({len(series)} data points)")
        results[cat] = forecast_category(cat, series, periods)

    # ── Forecast total expense ────────────────────────────────────────────
    logger.info(f"Forecasting total expense ({len(total_expense)} data points)")
    results["__total__"] = forecast_category("Total_Expense", total_expense, periods)

    # ── Build summary ─────────────────────────────────────────────────────
    summary = _build_summary(results, history, income_series, savings_series, periods)

    return {"forecasts": results, "summary": summary}


# ─────────────────────────────────────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _build_summary(
    results: Dict[str, Any],
    history: List[Dict],
    income_series: Dict[str, float],
    savings_series: Dict[str, float],
    periods: int,
) -> Dict[str, Any]:
    """Aggregate summary: totals, growth leaders, savings outlook."""

    recent = history[-3:]
    avg_recent_expense = float(np.mean([h.get("totalExpense", 0) for h in recent])) if recent else 0.0

    # Summed category forecasts per future month
    cat_keys = [k for k in results if k != "__total__"]
    monthly_totals = []
    for month_idx in range(periods):
        s = sum(
            results[cat]["forecasts"][month_idx]["forecast"]
            for cat in cat_keys
            if month_idx < len(results[cat]["forecasts"])
        )
        monthly_totals.append(round(s, 2))

    # Expected savings = latest income − forecasted next-month total
    latest_income  = float(income_series[max(income_series)]) if income_series else 0.0
    latest_savings = float(savings_series[max(savings_series)]) if savings_series else 0.0
    expected_savings = round(latest_income - monthly_totals[0], 2) if monthly_totals else 0.0

    # Growth leaders
    growth: Dict[str, float] = {}
    for cat in cat_keys:
        growth[cat] = results[cat]["trend"].get("avg_monthly_change_pct", 0.0)

    sorted_growth = sorted(growth.items(), key=lambda x: x[1], reverse=True)
    top_growing   = [{"category": k, "pct_change": round(v, 2)} for k, v in sorted_growth[:3]]
    top_shrinking = [{"category": k, "pct_change": round(v, 2)} for k, v in sorted_growth[-3:]]

    return {
        "avg_monthly_expense_last_3m":   round(avg_recent_expense, 2),
        "forecasted_monthly_totals":     monthly_totals,
        "forecasted_avg_total":          round(float(np.mean(monthly_totals)), 2) if monthly_totals else 0.0,
        "expected_savings_next_month":   expected_savings,
        "top_growing_categories":        top_growing,
        "top_shrinking_categories":      top_shrinking,
        "latest_income":                 round(latest_income, 2),
        "latest_savings":                round(latest_savings, 2),
        "total_forecast":                results.get("__total__"),
    }


def _forecast_direction(forecast_values: List[float], last_actual: float) -> str:
    """Determine if forecast values are trending up, down, or flat."""
    if not forecast_values:
        return "stable"
    first, last = forecast_values[0], forecast_values[-1]
    pct = (last - first) / (first + 1e-9) * 100
    if pct > 3:
        return "increasing"
    elif pct < -3:
        return "decreasing"
    return "stable"


def _empty_forecast(category: str, periods: int) -> Dict[str, Any]:
    return {
        "category": category,
        "forecasts": [
            {"date": "", "forecast": 0.0, "lower": 0.0, "upper": 0.0}
            for _ in range(periods)
        ],
        "trend": {
            "direction": "stable",
            "forecast_direction": "stable",
            "avg_monthly_change_pct": 0.0,
            "volatility_pct": 0.0,
            "overall_pct_change": 0.0,
        },
        "metrics": {
            "mae": 0.0, "mape": 0.0, "rmse": 0.0,
            "model_used": "none", "data_points_used": 0,
        },
        "last_known_value": 0.0,
        "avg_historical":   0.0,
    }
