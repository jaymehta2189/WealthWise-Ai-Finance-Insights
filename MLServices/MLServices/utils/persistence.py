import joblib

def save_model(model, filename: str):
    joblib.dump(model, f"models/{filename}.pkl")

def load_model(filename: str):
    return joblib.load(f"models/{filename}.pkl")
