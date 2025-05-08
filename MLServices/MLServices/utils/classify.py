from utils.persistence import load_model
from utils.suggestions import generate_suggestions
import numpy as np

def compute_behavioral_features(expenses: dict, income: float, savings: float):
    total_expenses = sum(expenses.values())
    essentials = sum(expenses.get(k, 0) for k in ['Rent', 'Groceries', 'Transport', 'Utilities', 'Healthcare'])
    discretionary = sum(expenses.get(k, 0) for k in ['Entertainment', 'Eating_Out', 'Miscellaneous'])
    features = {
        "Income": income,
        "Essentials_Ratio": essentials / total_expenses if total_expenses else 0,
        "Disposable_Income": income - total_expenses,
        "Discretionary_Ratio": discretionary / total_expenses if total_expenses else 0,
        "Loan_Stress_Ratio": expenses.get("Loan_Repayment", 0) / total_expenses if total_expenses else 0,
        "Insurance_Coverage_Ratio": expenses.get("Insurance", 0) / total_expenses if total_expenses else 0,
        "Healthcare_Weight": expenses.get("Healthcare", 0) / total_expenses if total_expenses else 0,
        "Savings": savings,
        "Rent": expenses.get("Rent", 0),
        "Eating_Out": expenses.get("Eating_Out", 0)
    }
    return features

def classify_user(income: float, savings: float, expenses: dict):
    model = load_model("user_classifier")
    features = compute_behavioral_features(expenses, income, savings)

    # Match training feature order
    expected_order = [
        "Income", "Essentials_Ratio", "Disposable_Income",
        "Discretionary_Ratio", "Loan_Stress_Ratio",
        "Insurance_Coverage_Ratio", "Healthcare_Weight"
    ]
    feature_values = [features[feature] for feature in expected_order]

    label_int = model.predict([feature_values])[0]
    suggestions = generate_suggestions(features)

    cluster_labels = {
        0: 'Frugal',
        1: 'Overspender',
        2: 'Balanced',
        3: 'Investor'
    }

    label_name = cluster_labels.get(label_int, "Unknown")

    return label_name, suggestions
