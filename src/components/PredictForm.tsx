import React, { useEffect, useState } from "react";
import { postPredict, getHealth, type PredictIn } from "../services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function PredictForm() {
  const [form, setForm] = useState<PredictIn>({
    year: new Date().getFullYear(),
    season: "winter",
    rain: 50,
    temp: 5,
    lag_discharge: 100,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [health, setHealth] = useState<{ status: string; model_loaded: boolean } | null>(null);

  useEffect(() => {
    getHealth().then(setHealth).catch((e) => setError(String(e)));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "year" || name === "rain" || name === "temp" || name === "lag_discharge" ? Number(value) : value,
    }) as PredictIn);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await postPredict(form);
      setResult(res.discharge_pred);
    } catch (err: any) {
      setError(err?.message || "Failed to predict");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle>Run Prediction</CardTitle>
        <CardDescription>
          Backend: {health ? `${health.status}, model_loaded=${String(health.model_loaded)}` : "checking..."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Season</label>
            <select name="season" value={form.season} onChange={onChange} className="w-full border rounded px-3 py-2">
              <option value="winter">winter</option>
              <option value="summer">summer</option>
              <option value="monsoon">monsoon</option>
              <option value="post_monsoon">post_monsoon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Rain (mm)</label>
            <input type="number" name="rain" value={form.rain} onChange={onChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Temp (°C)</label>
            <input type="number" name="temp" value={form.temp} onChange={onChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Lag Discharge (m³/s)</label>
            <input
              type="number"
              name="lag_discharge"
              value={form.lag_discharge}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </Button>
            {result !== null && (
              <div className="text-sm">
                Predicted discharge: <span className="font-semibold">{result}</span> m³/s
              </div>
            )}
            {error && <div className="text-sm text-red-600">{error}</div>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
