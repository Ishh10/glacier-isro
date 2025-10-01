// src/services/api.ts

// Type definitions remain correct
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

// NEW: Type definition for model performance metrics
export type ModelMetrics = {
  mae: number;
  rmse: number;
};

// Configuration remains correct
const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "changeme";

/**
 * Generic HTTP fetch wrapper with API key and robust error handling.
 *
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
    // Check for 204 No Content, which would cause an issue with res.json()
    if (res.status === 204) {
        return {} as T; // Return an empty object for void/no-content responses
    }
    return res.json();
  } 
  
  // 3. Handle error response (4xx or 5xx)
  
  // Attempt to read the error body as text (or JSON). This is crucial for FastAPI validation errors.
  let errorBody: string;
  try {
    // Attempt to parse JSON first, as FastAPI typically returns validation errors as JSON
    const jsonError = await res.json();
    errorBody = JSON.stringify(jsonError);
  } catch {
    // Fallback: Read as plain text if JSON parsing fails (e.g., HTML 500 page)
    errorBody = await res.text().catch(() => "");
  }
  
  // Throw a new Error that includes the status code, status text, and the response body.
  // This allows the frontend to parse the errorBody for details (like the "detail" field).
  const error = new Error(`${res.status} ${res.statusText}: ${errorBody}`);
  
  // Optionally, attach the status for easier handling in the frontend catch block
  (error as any).status = res.status; 
  
  throw error;
}

// API functions remain correct, relying on the improved http wrapper
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