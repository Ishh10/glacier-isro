# backend/main.py
import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

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

# Load model on startup
MODEL_PATH = os.getenv("MODEL_PATH", "model.joblib")
try:
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None

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
    return df.to_dict(orient="records")

@app.post("/predict", response_model=PredictOut)
def predict(data: PredictIn, auth=Depends(api_key_auth)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Train first.")
    # features used in training: rain, temp, lag_discharge
    X = [[data.rain, data.temp, data.lag_discharge]]
    yhat = float(model.predict(X)[0])
    return {"discharge_pred": round(yhat, 2)}
