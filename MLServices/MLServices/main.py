# from fastapi import FastAPI
# from schemas import UserData, ForecastData, AnomalyData
# from utils.forecasting import forecast_next_month
# from utils.anomaly import check_anomaly
# from utils.classify import classify_user, compute_behavioral_features

# app = FastAPI()

# @app.post("/classify-user")
# def classify_user_api(data: UserData):
#     label, suggestions = classify_user(data.income, data.savings, data.expenses)
#     return {"label": label, "suggestions": suggestions}

# # @app.post("/forecast")
# # def forecast_api(data: ForecastData):
# #     # Convert the nested dict into a list of {"date": ..., "amount": ...}
# #     flattened_history = [
# #         {"date": date, "amount": sum(categories.values())}
# #         for date, categories in data.history.items()
# #     ]
# #     forecast = forecast_next_month(flattened_history)
# #     return {"forecast": forecast}

# @app.post("/forecast")
# def forecast_api(data: ForecastData):
#     results = {}
#     # data.history is Dict[str, Dict[str, float]]
#     for category, series in data.history.items():
#         # flatten each category’s time series
#         flat = [
#           {"date": f"{date}-01", "amount": amt}
#           for date, amt in series.items()
#         ]
#         pred = forecast_next_month(flat)
#         results[category] = pred
#     return {"forecasts": results}


# @app.post("/anomaly-check")
# def anomaly_api(data: AnomalyData):
#     is_outlier, reason = check_anomaly(data.ratios)
#     return {"anomaly": is_outlier, "reason": reason}

# @app.post("/full-analysis")
# def full_analysis(data: UserData):
#     label, suggestions = classify_user(data.income, data.savings, data.expenses)
#     forecast = {"groceries": 1200}
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


from fastapi import FastAPI
from schemas import UserData, ForecastData, AnomalyData
from utils.forecasting import forecast_next_month
from utils.anomaly import check_anomaly
from utils.classify import classify_user, compute_behavioral_features
from typing import Dict, List
app = FastAPI()

@app.post("/classify-user")
def classify_user_api(data: UserData):
    label, suggestions = classify_user(data.income, data.savings, data.expenses)
    return {"label": label, "suggestions": suggestions}

@app.post("/forecast")
def forecast_api(data: ForecastData):
    results: Dict[str, list] = {}
    # data.history: { "YYYY-MM": { category: amount } }
    # We want per-category time series:
    #   for each category, map over all months
    # Build a dict of category -> {month: amount}
    per_cat: Dict[str, Dict[str, float]] = {}
    for month, cats in data.history.items():
        for cat, amt in cats.items():
            per_cat.setdefault(cat, {})[month] = amt

    # Now forecast each category
    for cat, series in per_cat.items():
        # flatten into list of {date, amount}
        flat = [ {"date": f"{month}-01", "amount": value} for month, value in series.items() ]
        preds = forecast_next_month(flat, periods=data.periods)
        results[cat] = preds
    return {"forecasts": results}

@app.post("/anomaly-check")
def anomaly_api(data: AnomalyData):
    is_outlier, reason = check_anomaly(data.ratios)
    return {"anomaly": is_outlier, "reason": reason}

@app.post("/full-analysis")
def full_analysis(data: UserData):
    label, suggestions = classify_user(data.income, data.savings, data.expenses)
    # Example: total expenses history would be provided in ForecastData, but here stub
    forecast = { "total": [] }
    behavioral_features = compute_behavioral_features(data.expenses, data.income, data.savings)
    is_outlier, reason = check_anomaly(behavioral_features)
    return {
        "label": label,
        "forecast": forecast,
        "suggestions": suggestions,
        "anomaly": {
            "status": is_outlier,
            "reason": reason
        }
    }