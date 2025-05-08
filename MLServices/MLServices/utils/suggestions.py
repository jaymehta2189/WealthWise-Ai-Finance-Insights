def generate_suggestions(features: dict) -> list[str]:
    income = features.get("Income", 0)
    suggestions = []

    if features.get("Eating_Out", 0) > 0.25 * income:
        suggestions.append("Eating Out exceeds 25% of income. Reduce dining expenses.")

    if features.get("Rent", 0) > 0.5 * income:
        suggestions.append("Rent is above 50% of income. Explore cheaper housing.")

    if features.get("Savings", 0) < 0.1 * income:
        suggestions.append("You’re saving less than 10% of income. Prioritize savings.")

    return suggestions
