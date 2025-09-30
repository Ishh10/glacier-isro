# backend/train_backend_model.py
# Trains a small regression model on your seasonal CSV and saves model.joblib
# Priority order for data:
#   1) data/real_seasonal.csv (from build_real_dataset.py)
#   2) data/seasonal.csv      (from make_fake_data.py)

import pandas as pd
from pathlib import Path
import xgboost as xgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib
import numpy as np

def find_data():
    for p in ["../data/real_seasonal.csv", "../data/seasonal.csv"]:
        path = Path(p)
        if path.exists():
            return path
    raise SystemExit("No dataset found. Expected ../data/real_seasonal.csv or ../data/seasonal.csv")

path = find_data()
print("Training on:", path)

df = pd.read_csv(path)

# Harmonize columns
if {"rain","temp","lag_discharge","discharge"}.issubset(df.columns):
    # synthetic seasonal.csv already in right shape
    X = df[["rain","temp","lag_discharge"]]
    y = df["discharge"]
else:
    # real seasonal: t2m_mean_c, precip_sum_mm, discharge_mean_cms, lags
    # build simple equivalents:
    df = df.dropna(subset=["t2m_mean_c","precip_sum_mm","discharge_mean_cms","Q_prev_season"])
    df = df.rename(columns={
        "t2m_mean_c":"temp",
        "precip_sum_mm":"rain",
        "Q_prev_season":"lag_discharge",
        "discharge_mean_cms":"discharge"
    })
    X = df[["rain","temp","lag_discharge"]]
    y = df["discharge"]

# Chronological split: last 6 rows as test
train = df.iloc[:-6]
test  = df.iloc[-6:]

Xtr, ytr = train[["rain","temp","lag_discharge"]], train["discharge"]
Xte, yte = test[["rain","temp","lag_discharge"]], test["discharge"]

model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=400, max_depth=5, learning_rate=0.05, random_state=42, n_jobs=-1)
model.fit(Xtr, ytr)
pred = model.predict(Xte)

mae = mean_absolute_error(yte, pred)
rmse = np.sqrt(mean_squared_error(yte, pred))
print(f"MAE={mae:.3f}  RMSE={rmse:.3f}")

joblib.dump(model, "model.joblib")
print("Saved model.joblib")

# Also emit a small preds.csv to ../runs for the dashboard
out = test[["year","season"]].copy() if "year" in test.columns else test.copy()
out["actual"] = yte.values
out["pred"] = np.round(pred, 3)
Path("../runs").mkdir(parents=True, exist_ok=True)
out.to_csv("../runs/preds.csv", index=False)
print("Wrote ../runs/preds.csv")
