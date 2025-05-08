# utils/anomaly.py

# Simple rule-based anomaly checker
def check_anomaly(ratios: dict):
    # Example rules — adjust based on data distribution
    if ratios.get("Loan_Stress_Ratio", 0) > 0.5:
        return True, "High loan stress detected."

    if ratios.get("Discretionary_Ratio", 0) > 0.6:
        return True, "Too much discretionary spending."

    if ratios.get("Essentials_Ratio", 0) < 0.3:
        return True, "Very low essentials ratio — check data quality."
    
     # Dummy check for outlier
    if ratios.get("Disposable_Income", 0) < 0:
        return True, "Your expenses exceed your income."

    return False, "All financial metrics appear normal. No anomaly detected."
