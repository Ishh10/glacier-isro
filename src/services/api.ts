// src/services/api.ts
export type PredictIn = {
  year: number;
  season: "winter" | "summer" | "monsoon" | "post_monsoon";
  rain: number;
  temp: number;
  lag_discharge: number;
};

export type PredictOut = {
  discharge_pred: number;
};

const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "changeme";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...(init || {}),
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export async function getHealth(): Promise<{ status: string; model_loaded: boolean }>{
  return http("/health");
}

export async function getPreds(): Promise<any[]> {
  return http("/preds");
}

export async function postPredict(payload: PredictIn): Promise<PredictOut> {
  return http("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
