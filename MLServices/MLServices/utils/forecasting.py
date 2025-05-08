# from prophet import Prophet
# import pandas as pd

# def forecast_next_month(history: list[dict], periods: int = 1):
#     df = pd.DataFrame(history)
#     df['ds'] = pd.to_datetime(df['date'])
#     df['y'] = df['amount']
#     df = df[['ds', 'y']]

#     model = Prophet()
#     model.fit(df)

#     future = model.make_future_dataframe(periods=periods, freq='MS')
#     forecast = model.predict(future)

#     next_month_pred = forecast[['ds', 'yhat']].tail(periods)
#     return {
#         "forecast": round(next_month_pred['yhat'].iloc[0], 2),
#         "date": str(next_month_pred['ds'].iloc[0].date())
#     }



# from prophet import Prophet
# import pandas as pd
# from typing import Union, List, Dict

# def forecast_next_month(
#     history: Union[List[Dict[str, Union[str, float]]], Dict[str, Dict[str, float]]],
#     periods: int = 1
# ) -> Union[Dict[str, Union[str, float]], Dict[str, Dict[str, Union[str, float]]]]:
#     """
#     Perform next-month forecasting.

#     For a single series (list of {'date':..., 'amount':...}), returns {date, forecast}.
#     For multiple categories (dict of category -> {YYYY-MM: amount}), returns per-category forecasts.

#     Args:
#         history: Either:
#             - List of dicts with 'date' (YYYY-MM-DD) and 'amount' for a single series
#             - Dict mapping category names to dict of 'YYYY-MM' -> amount
#         periods: Number of future months to forecast

#     Returns:
#         If single series: {
#             'date': 'YYYY-MM-DD',
#             'forecast': float
#         }
#         If multi-series: {
#             category: { 'date': 'YYYY-MM-DD', 'forecast': float },
#             ...
#         }
#     """
#     def _predict_series(df: pd.DataFrame) -> Dict[str, Union[str, float]]:
#         model = Prophet()
#         model.fit(df)
#         future = model.make_future_dataframe(periods=periods, freq='MS')
#         forecast = model.predict(future)
#         next_pred = forecast[['ds', 'yhat']].tail(periods).iloc[0]
#         return {
#             'date': str(next_pred['ds'].date()),
#             'forecast': round(next_pred['yhat'], 2)
#         }

#     # Single series: list input
#     if isinstance(history, list):
#         df = pd.DataFrame(history)
#         df['ds'] = pd.to_datetime(df['date'])
#         df['y'] = df['amount']
#         df = df[['ds', 'y']]
#         return _predict_series(df)

#     # Multi-series: dict input
#     results: Dict[str, Dict[str, Union[str, float]]] = {}
#     for category, series in history.items():
#         df = pd.DataFrame([
#             {'ds': pd.to_datetime(f"{date_str}-01"), 'y': amount}
#             for date_str, amount in series.items()
#         ])
#         results[category] = _predict_series(df)

#     return results



# from prophet import Prophet
# import pandas as pd
# from typing import Union, List, Dict, Any

# def forecast_next_month(
#     history: Union[List[Dict[str, Union[str, float]]], Dict[str, Dict[str, float]]],
#     periods: int = 3
# ) -> Union[List[Dict[str, Union[str, float]]], Dict[str, List[Dict[str, Union[str, float]]]]]:
#     """
#     Perform multi-month forecasting.

#     For a single series (list of {'date':..., 'amount':...}), returns a list of {date, forecast} for the next `periods` months.
#     For multiple categories (dict of category -> {YYYY-MM: amount}), returns per-category lists of forecasts.

#     Args:
#         history: Either:
#             - List of dicts with 'date' (YYYY-MM-DD) and 'amount' for a single series
#             - Dict mapping category names to dict of 'YYYY-MM' -> amount
#         periods: Number of future months to forecast

#     Returns:
#         If single series: [
#             { 'date': 'YYYY-MM-DD', 'forecast': float },
#             ... (one per period)
#         ]
#         If multi-series: {
#             category: [ { 'date': 'YYYY-MM-DD', 'forecast': float }, ... ],
#             ...
#         }
#     """
#     def _predict_series(df: pd.DataFrame) -> List[Dict[str, Union[str, float]]]:
#         model = Prophet(yearly_seasonality=True,
#                         weekly_seasonality=False,
#                         daily_seasonality=False)
#         model.fit(df)
#         future = model.make_future_dataframe(periods=periods, freq='MS')
#         forecast = model.predict(future)
#         # Get only the last `periods` rows
#         preds = forecast[['ds', 'yhat']].tail(periods)
#         result = []
#         for _, row in preds.iterrows():
#             result.append({
#                 'date': row['ds'].date().isoformat(),
#                 'forecast': round(row['yhat'], 2)
#             })
#         return result

#     # Single series: list input
#     if isinstance(history, list):
#         df = pd.DataFrame(history)
#         df['ds'] = pd.to_datetime(df['date'])
#         df['y'] = df['amount']
#         df = df[['ds', 'y']]
#         return _predict_series(df)

#     # Multi-series: dict input
#     results: Dict[str, List[Dict[str, Union[str, float]]]] = {}
#     for category, series in history.items():
#         df = pd.DataFrame([
#             {'ds': pd.to_datetime(f"{date_str}-01"), 'y': amount}
#             for date_str, amount in series.items()
#         ])
#         results[category] = _predict_series(df)

#     return results


# utils/forecasting.py
from prophet import Prophet
import pandas as pd
from typing import List, Dict, Union, Any


def forecast_next_month(
    history: Union[List[Dict[str, Union[str, float]]], Dict[str, Dict[str, float]]],
    periods: int = 3
) -> Union[List[Dict[str, Union[str, float]]], Dict[str, List[Dict[str, Any]]]]:
    """
    Perform multi-month forecasting.

    - Single series (list of {date, amount}) -> list of next `periods` forecasts
    - Multi-category (dict of category->{YYYY-MM: amount}) -> dict of category->list of forecasts
    """
    def _predict_series(df: pd.DataFrame) -> List[Dict[str, Union[str, float]]]:
        model = Prophet(yearly_seasonality=True,
                        weekly_seasonality=False,
                        daily_seasonality=False)
        model.fit(df)
        future = model.make_future_dataframe(periods=periods, freq='MS')
        forecast = model.predict(future)
        preds = forecast[['ds', 'yhat']].tail(periods)
        output = []
        for _, row in preds.iterrows():
            output.append({
                'date': row['ds'].date().isoformat(),
                'forecast': round(row['yhat'], 2)
            })
        return output

    # single-series
    if isinstance(history, list):
        df = pd.DataFrame(history)
        df['ds'] = pd.to_datetime(df['date'])
        df['y'] = df['amount']
        df = df[['ds', 'y']]
        return _predict_series(df)

    # multi-series
    results: Dict[str, List[Dict[str, Any]]] = {}
    for category, series in history.items():
        df = pd.DataFrame([
            {'ds': pd.to_datetime(f"{date_str}-01"), 'y': amount}
            for date_str, amount in series.items()
        ])
        results[category] = _predict_series(df)
    return results
