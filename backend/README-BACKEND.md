# Backend (FastAPI) — Step by Step

## 1) Open the project
Open PowerShell in your project root (where `app.py` lives). You should see a folder called `backend`.

## 2) Turn on your Python environment
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

## 3) Install backend libraries
```powershell
pip install -r backendequirements-backend.txt
```

## 4) Train the model for the backend
- If you already built REAL data: run `python build_real_dataset.py` first (creates `dataeal_seasonal.csv`).
- If not, use the synthetic data: `python scripts\make_fake_data.py`.

Then train:
```powershell
python backend	rain_backend_model.py
```

This creates:
- `backend\model.joblib`
- `runs\preds.csv`

## 5) Start the server
Easiest way:
```powershell
.ackendun.ps1
```
Or directly:
```powershell
uvicorn backend.main:app --reload --port 8000
```

## 6) Test it (while server is running)
Open another PowerShell tab (keep server running) and run:

### Health check
```powershell
curl http://127.0.0.1:8000/health
```

### Get predictions table (needs API key)
```powershell
curl -H "x-api-key: supersecretkey" http://127.0.0.1:8000/preds
```

### Do a single prediction (needs API key)
```powershell
curl -X POST http://127.0.0.1:8000/predict ^
  -H "Content-Type: application/json" ^
  -H "x-api-key: supersecretkey" ^
  -d "{""year"":2020,""season"":""monsoon"",""rain"":200,""temp"":25,""lag_discharge"":50}"
```

You should get back a number like:
```json
{"discharge_pred": 63.42}
```

## 7) Connect frontend (Streamlit) to backend (optional)
In your Streamlit app, call `http://127.0.0.1:8000/preds` with header `x-api-key: supersecretkey` to fetch the latest predictions and show them.
