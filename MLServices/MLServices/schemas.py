

# from pydantic import BaseModel
# from typing import Dict, List, Union

# class UserData(BaseModel):
#     income: float
#     savings: float
#     expenses: Dict[str, float]  # 'Rent', 'Loan_Repayment', ..., 'Miscellaneous'

# class ForecastData(BaseModel):
#     # history: { "YYYY-MM": { category: amount, ... }, ... }
#     history: Dict[str, Dict[str, float]]
#     periods: int = 3

# class AnomalyData(BaseModel):
#     ratios: Dict[str, float]




# schemas.py
from pydantic import BaseModel, validator
from typing import Dict, List, Optional, Any


# ─────────────────────────────────────────────
#  Shared / Existing
# ─────────────────────────────────────────────

class UserData(BaseModel):
    income: float
    savings: float
    expenses: Dict[str, float]  # 'Rent', 'Loan_Repayment', ..., 'Miscellaneous'


class AnomalyData(BaseModel):
    ratios: Dict[str, float]


# ─────────────────────────────────────────────
#  Forecasting — Request
# ─────────────────────────────────────────────

class PeriodData(BaseModel):
    """One month's complete financial snapshot."""
    period: str                          # "YYYY-MM"
    byCategory: Dict[str, float]         # { "Food": 6500.0, "Rent": 7000.0, ... }
    totalExpense: float
    totalIncome: float
    netSavings: float

    @validator("period")
    def validate_period_format(cls, v):
        import re
        if not re.match(r"^\d{4}-\d{2}$", v):
            raise ValueError("period must be in YYYY-MM format")
        return v


class ForecastRequest(BaseModel):
    userId: str
    history: List[PeriodData]            # Chronologically ordered list
    periods: int = 3                     # How many months ahead to forecast

    @validator("history")
    def validate_history_length(cls, v):
        if len(v) < 2:
            raise ValueError("At least 2 months of history are required for forecasting")
        return v

    @validator("periods")
    def validate_periods(cls, v):
        if not (1 <= v <= 12):
            raise ValueError("periods must be between 1 and 12")
        return v


# ─────────────────────────────────────────────
#  Forecasting — Response
# ─────────────────────────────────────────────

class ForecastPoint(BaseModel):
    """Single forecast data point for one month."""
    date: str                            # "YYYY-MM"
    forecast: float                      # Point estimate
    lower: float                         # 90% CI lower bound
    upper: float                         # 90% CI upper bound


class TrendMetrics(BaseModel):
    """Historical + forecast trend statistics."""
    direction: str                       # "increasing" | "decreasing" | "stable"
    forecast_direction: str
    avg_monthly_change_pct: float        # Average month-over-month % change
    volatility_pct: float                # Std dev of % changes
    overall_pct_change: float            # First → last historical % change


class ModelMetrics(BaseModel):
    """Forecast model accuracy on training data."""
    mae: float                           # Mean Absolute Error
    mape: float                          # Mean Absolute Percentage Error (%)
    rmse: float                          # Root Mean Square Error
    model_used: str                      # "prophet" | "linear_trend"
    data_points_used: int
    note: Optional[str] = None


class CategoryForecast(BaseModel):
    """Full forecast result for a single spending category."""
    category: str
    forecasts: List[ForecastPoint]
    trend: TrendMetrics
    metrics: ModelMetrics
    last_known_value: float
    avg_historical: float


class SummaryForecast(BaseModel):
    """High-level aggregate forecast summary."""
    avg_monthly_expense_last_3m: float
    forecasted_monthly_totals: List[float]
    forecasted_avg_total: float
    expected_savings_next_month: float
    top_growing_categories: List[Dict[str, Any]]    # [{category, pct_change}]
    top_shrinking_categories: List[Dict[str, Any]]
    latest_income: float
    latest_savings: float
    total_forecast: Optional[CategoryForecast] = None


class ForecastResponse(BaseModel):
    """Complete response from /forecast endpoint."""
    userId: str
    forecasts: Dict[str, CategoryForecast]
    summary: SummaryForecast
    generated_at: str


# ─────────────────────────────────────────────
#  Legacy (backward compatibility)
# ─────────────────────────────────────────────

class ForecastData(BaseModel):
    """Legacy format — dict-of-dicts history."""
    history: Dict[str, Dict[str, float]]
    periods: int = 3
