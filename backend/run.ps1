# backend/run.ps1
$env:API_KEY = "supersecretkey"
uvicorn backend.main:app --reload --port 8000
