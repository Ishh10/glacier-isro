// src/services/api.ts
export type PredictIn = {
  year: number;
  season: "winter" | "summer" | "monsoon" | "post_monsoon";
  // Corrected 'float' to 'number'
  rain: number;
  temp: number;
  lag_discharge: number;
};

export type PredictOut = {
  discharge_pred: number;
};

export type ModelMetrics = {
  mae: number;
  rmse: number;
};

const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "changeme";

/**
 * Generic HTTP fetch wrapper with API key and robust error handling.
 * It attempts to parse the response body (even on error) to provide maximum detail.
 */
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;

  // 1. Initial network request
  const res = await fetch(url, {
    ...(init || {}),
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
      ...(init?.headers || {}),
    },
  });

  // 2. Handle successful response (200-299)
  if (res.ok) {
    if (res.status === 204) {
      return {} as T; // Handle No Content responses
    }
    return res.json();
  } 

  // 3. Handle error response (4xx or 5xx)
  let errorBody: string;
  try {
    // Attempt to parse JSON first (crucial for FastAPI/Pydantic validation errors)
    const jsonError = await res.json();
    errorBody = JSON.stringify(jsonError);
  } catch {
    // Fallback: Read as plain text if JSON parsing fails
    errorBody = await res.text().catch(() => "");
  }
  
  // Throw a single, robust Error object for the frontend to catch and parse.
  const error = new Error(`${res.status} ${res.statusText}: ${errorBody}`);
  throw error;
}

export async function getHealth(): Promise<{ status: string; model_loaded: boolean }>{
  return http("/health");
}

export async function getPreds(): Promise<any[]> {
  return http("/preds");
}

export async function getClimateData(): Promise<any[]> {
  return http("/climate-data");
}

export async function getModelPerformance(): Promise<ModelMetrics> {
  return http("/model-performance");
}

export async function postPredict(payload: PredictIn): Promise<PredictOut> {
  return http("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
