

# from fastapi import FastAPI
# from schemas import UserData, ForecastData, AnomalyData
# from utils.forecasting import forecast_next_month
# from utils.anomaly import check_anomaly
# from utils.classify import classify_user, compute_behavioral_features
# from typing import Dict, List
# app = FastAPI()

# @app.post("/classify-user")
# def classify_user_api(data: UserData):
#     label, suggestions = classify_user(data.income, data.savings, data.expenses)
#     return {"label": label, "suggestions": suggestions}

# @app.post("/forecast")
# def forecast_api(data: ForecastData):
#     results: Dict[str, list] = {}
#     # data.history: { "YYYY-MM": { category: amount } }
#     # We want per-category time series:
#     #   for each category, map over all months
#     # Build a dict of category -> {month: amount}
#     per_cat: Dict[str, Dict[str, float]] = {}
#     for month, cats in data.history.items():
#         for cat, amt in cats.items():
#             per_cat.setdefault(cat, {})[month] = amt

#     # Now forecast each category
#     for cat, series in per_cat.items():
#         # flatten into list of {date, amount}
#         flat = [ {"date": f"{month}-01", "amount": value} for month, value in series.items() ]
#         preds = forecast_next_month(flat, periods=data.periods)
#         results[cat] = preds
#     return {"forecasts": results}

# @app.post("/anomaly-check")
# def anomaly_api(data: AnomalyData):
#     is_outlier, reason = check_anomaly(data.ratios)
#     return {"anomaly": is_outlier, "reason": reason}

# @app.post("/full-analysis")
# def full_analysis(data: UserData):
#     label, suggestions = classify_user(data.income, data.savings, data.expenses)
#     # Example: total expenses history would be provided in ForecastData, but here stub
#     forecast = { "total": [] }
#     behavioral_features = compute_behavioral_features(data.expenses, data.income, data.savings)
#     is_outlier, reason = check_anomaly(behavioral_features)
#     return {
#         "label": label,
#         "forecast": forecast,
#         "suggestions": suggestions,
#         "anomaly": {
#             "status": is_outlier,
#             "reason": reason
#         }
#     }








# main.py
import logging
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import (
    UserData,
    AnomalyData,
    ForecastRequest,
    ForecastData,           # legacy — kept for backward compat
)
from utils.forecasting import forecast_all_categories, forecast_category
from utils.anomaly import check_anomaly
from utils.classify import classify_user, compute_behavioral_features

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
#  App
# ─────────────────────────────────────────────

app = FastAPI(
    title="FinanceML Service",
    description="Industrial-grade ML service for spending classification, forecasting, and anomaly detection.",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────────
#  Health
# ─────────────────────────────────────────────

@app.get("/health", tags=["Meta"])
def health_check():
    return {
        "status": "ok",
        "version": "2.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# ─────────────────────────────────────────────
#  Classify
# ─────────────────────────────────────────────

@app.post("/classify-user", tags=["Classification"])
def classify_user_api(data: UserData):
    """
    Classify a user into a spending archetype:
    Frugal | Overspender | Balanced | Investor
    and return personalised suggestions.
    """
    try:
        label, suggestions = classify_user(data.income, data.savings, data.expenses)
        return {"label": label, "suggestions": suggestions}
    except Exception as exc:
        logger.error(f"/classify-user error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(exc))


# ─────────────────────────────────────────────
#  Forecast  (primary — rich PeriodData input)
# ─────────────────────────────────────────────

@app.post("/forecast", tags=["Forecasting"])
def forecast_api(data: ForecastRequest):
    """
    Forecast next N months of spending per category.

    Input:  userId + chronological list of monthly PeriodData snapshots.
    Output: Per-category forecasts with confidence intervals, trend analysis,
            model accuracy metrics, and an aggregate summary.
    """
    try:
        history = [p.dict() for p in data.history]
        logger.info(
            f"Forecast request | userId={data.userId} | "
            f"history_months={len(history)} | periods={data.periods}"
        )

        result = forecast_all_categories(history, periods=data.periods)

        return {
            "userId":       data.userId,
            "forecasts":    result["forecasts"],
            "summary":      result["summary"],
            "generated_at": datetime.now(timezone.utc).isoformat(),
        }

    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        logger.error(f"/forecast error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(exc))


# ─────────────────────────────────────────────
#  Legacy Forecast  (dict-of-dicts format)
# ─────────────────────────────────────────────

@app.post("/forecast/legacy", tags=["Forecasting"])
def forecast_legacy_api(data: ForecastData):
    """
    Backward-compatible forecast endpoint.
    Accepts old dict-of-dicts history format { 'YYYY-MM': { category: amount } }.
    Converts to PeriodData internally and delegates to forecast_category.
    """
    try:
        results = {}
        per_cat = {}
        for month, cats in data.history.items():
            for cat, amt in cats.items():
                per_cat.setdefault(cat, {})[month] = amt

        for cat, series in per_cat.items():
            results[cat] = forecast_category(cat, series, periods=data.periods)

        return {"forecasts": results}

    except Exception as exc:
        logger.error(f"/forecast/legacy error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(exc))


# ─────────────────────────────────────────────
#  Anomaly Check
# ─────────────────────────────────────────────

@app.post("/anomaly-check", tags=["Anomaly"])
def anomaly_api(data: AnomalyData):
    """
    Rule-based anomaly detection on computed financial ratios.
    Returns anomaly flag and human-readable reason.
    """
    try:
        is_outlier, reason = check_anomaly(data.ratios)
        return {"anomaly": is_outlier, "reason": reason}
    except Exception as exc:
        logger.error(f"/anomaly-check error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(exc))


# ─────────────────────────────────────────────
#  Full Analysis  (classify + anomaly, no stub forecast)
# ─────────────────────────────────────────────

@app.post("/full-analysis", tags=["Analysis"])
def full_analysis(data: UserData):
    """
    Combined endpoint:
      - Spending archetype classification
      - Personalised suggestions
      - Anomaly detection on behavioural ratios
    Forecast is NOT included here — call /forecast separately
    with full historical data for the best results.
    """
    try:
        label, suggestions = classify_user(data.income, data.savings, data.expenses)
        behavioral_features = compute_behavioral_features(
            data.expenses, data.income, data.savings
        )
        is_outlier, reason = check_anomaly(behavioral_features)

        return {
            "label":       label,
            "suggestions": suggestions,
            "anomaly": {
                "status": is_outlier,
                "reason": reason,
            },
            "behavioral_features": behavioral_features,
        }

    except Exception as exc:
        logger.error(f"/full-analysis error: {exc}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(exc))
