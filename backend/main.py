# backend/main.py
import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path
import json

API_KEY = os.getenv("API_KEY", "changeme")

def api_key_auth(x_api_key: Optional[str] = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    return True

app = FastAPI(title="Glacier Flow Backend", version="1.0.0")

# Allow frontend (Streamlit localhost) and any static site preview
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for quick demos; tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictIn(BaseModel):
    year: int
    season: str  # "winter" | "summer" | "monsoon" | "post_monsoon"
    rain: float
    temp: float
    lag_discharge: float

class PredictOut(BaseModel):
    discharge_pred: float

# --- START OF MODEL LOADING FIX ---

def load_model():
    """Tries to load the model.joblib file from various common paths."""
    
    # 1. Check the environment variable (if set)
    env_path = os.getenv("MODEL_PATH")
    if env_path and Path(env_path).exists():
        print(f"INFO: Loaded model via ENV_VAR: {env_path}")
        return joblib.load(env_path)

    # Common paths to check relative to the project root (where uvicorn is run from)
    possible_paths = [
        # Explicit path inside the backend folder (most reliable)
        "backend/model.joblib",
        # Default fallback (if running from backend folder itself)
        "model.joblib",
        # Path if model was saved one level up
        "../model.joblib", 
    ]
    
    for path_str in possible_paths:
        path = Path(path_str)
        if path.exists():
            print(f"INFO: Model found and loaded successfully from: {path_str}")
            return joblib.load(path)
            
    print("ERROR: Model file (model.joblib) NOT FOUND in any expected location.")
    return None

model = load_model()

# --- END OF MODEL LOADING FIX ---

# FIXED load_seasonal_data to ensure 'year' and 'season' are returned correctly.
def load_seasonal_data():
    """Finds, loads, and cleans the primary seasonal data (real or synthetic)."""
    # Priority check for the data file:
    data_path = None
    for p in ["../data/real_seasonal.csv", "../data/seasonal.csv"]:
        path = Path(p)
        if path.exists():
            data_path = path
            break
    
    # Fallback check for different run environments (e.g., inside 'backend' dir)
    if data_path is None:
        for p in ["data/real_seasonal.csv", "data/seasonal.csv"]:
            path = Path(p)
            if path.exists():
                data_path = path
                break

    if data_path is None:
        raise FileNotFoundError("No seasonal dataset found. Expected ../data/real_seasonal.csv or ../data/seasonal.csv")

    df = pd.read_csv(data_path)
    
    # Define the final set of columns expected by the frontend
    final_cols = ["year", "season", "rain", "temp", "lag_discharge", "discharge"]

    # Harmonization Logic
    if "t2m_mean_c" in df.columns:
        # Case 1: Real seasonal data (data/real_seasonal.csv) - which is actually yearly data
        # Rename and create necessary columns
        df = df.dropna(subset=["t2m_mean_c","precip_sum_mm","discharge_mean_cms","Q_prev_season"])
        df = df.rename(columns={
            "t2m_mean_c":"temp",
            "precip_sum_mm":"rain",
            "Q_prev_season":"lag_discharge",
            "discharge_mean_cms":"discharge",
            "Year": "year" # <-- Renaming 'Year' to lowercase 'year' for consistency
        })
        # The real_seasonal data is yearly, so we manually inject a season label
        df["season"] = "Yearly"
        
        # Select only the columns needed
        df = df.reindex(columns=final_cols)
        
    elif {"rain","temp","lag_discharge","discharge","year","season"}.issubset(df.columns):
        # Case 2: Synthetic seasonal.csv (or harmonized data)
        df = df.dropna(subset=["rain","temp","lag_discharge","discharge"])
        # Ensure column names are lowercase if needed (assuming they are)
        df = df.rename(columns={"Year": "year", "Season": "season"}, errors="ignore")
        df = df.reindex(columns=final_cols)
    else:
        # Fallback for unknown data format (should not happen with provided files)
        raise ValueError("Data format not recognized. Check columns in CSV.")

    return df

@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}

@app.get("/preds")
def get_preds(auth=Depends(api_key_auth)):
    # Return the latest predictions CSV (if exists).
    path = os.getenv("PREDS_PATH", "../runs/preds.csv")
    try:
        df = pd.read_csv(path)
    except Exception:
        raise HTTPException(status_code=404, detail="preds.csv not found. Run training first.")
    # Ensure year and season are present for dashboard
    if "Year" in df.columns:
         df = df.rename(columns={"Year": "year"})
    if "Season" in df.columns:
         df = df.rename(columns={"Season": "season"})
         
    return df.to_dict(orient="records")

@app.get("/climate-data")
def get_climate_data(auth=Depends(api_key_auth)):
    """Returns the full historical climate dataset for the ClimateDataPage."""
    try:
        df = load_seasonal_data()
    except (FileNotFoundError, ValueError) as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    # Return all data
    return df.to_dict(orient="records")

@app.get("/model-performance")
def get_model_performance(auth=Depends(api_key_auth)):
    """Returns the MAE and RMSE for the AIModelsPage."""
    path = Path("../runs/model_performance.json")
    try:
        if not path.exists():
            # Fallback for different run environments
            path = Path("runs/model_performance.json")
            if not path.exists():
                 raise FileNotFoundError("Model performance file not found. Run training first.")
                 
        with open(path, "r") as f:
            metrics = json.load(f)
    except Exception:
        raise HTTPException(status_code=404, detail="Model performance file not found. Run training first.")
    
    return metrics


@app.post("/predict", response_model=PredictOut)
def predict(data: PredictIn, auth=Depends(api_key_auth)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Train first.")
    # features used in training: rain, temp, lag_discharge
    X = [[data.rain, data.temp, data.lag_discharge]]
    yhat = float(model.predict(X)[0])
    return {"discharge_pred": round(yhat, 2)}

