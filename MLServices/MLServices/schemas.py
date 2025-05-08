# from pydantic import BaseModel
# from typing import Dict, List, Union

# class UserData(BaseModel):
#     income: float
#     savings: float
#     expenses: Dict[str, float]  # 'Rent', 'Loan_Repayment', ..., 'Miscellaneous'

# class ForecastData(BaseModel):
#     history: Dict[str, Dict[str, float]]  # {"2024-12": {"Groceries": 5000, "Transport": 2000}, ...}


# class AnomalyData(BaseModel):
#     ratios: Dict[str, float]


from pydantic import BaseModel
from typing import Dict, List, Union

class UserData(BaseModel):
    income: float
    savings: float
    expenses: Dict[str, float]  # 'Rent', 'Loan_Repayment', ..., 'Miscellaneous'

class ForecastData(BaseModel):
    # history: { "YYYY-MM": { category: amount, ... }, ... }
    history: Dict[str, Dict[str, float]]
    periods: int = 3

class AnomalyData(BaseModel):
    ratios: Dict[str, float]