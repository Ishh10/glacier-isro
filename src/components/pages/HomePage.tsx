import { useEffect, useMemo, useState } from "react";
import { Hero } from "../Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface HomePageProps {
  onNavigateToDashboard: () => void;
  onNavigateToAbout: () => void;
}

type WeatherRow = {
  date: string;
  precipitation_sum: number;
  temperature_2m_max: number;
};

/* ---------- safe CSV helpers ---------- */
function parseCSV(text: string) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map((h) => h.trim());
  return lines.map((ln) => {
    const cols = ln.split(",");
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = (cols[i] ?? "").trim()));
    return obj;
  });
}

async function loadDelhiWeather(): Promise<WeatherRow[]> {
  const res = await fetch("/data/delhi_monthly_weather_2000_2024.csv");
  if (!res.ok) return [];
  const rows = parseCSV(await res.text());
  const out = rows
    .map((r) => {
      const raw = r["month"]; // e.g., "2000-01-01" or "2000-01"
      const d = new Date(raw);
      const date = isNaN(d.getTime()) ? String(raw).slice(0, 7) : d.toISOString().slice(0, 7);
      return {
        date,
        precipitation_sum: Number(r["precipitation_sum"]),
        temperature_2m_max: Number(r["temperature_2m_max"]),
      };
    })
    .filter(
      (x) => Number.isFinite(x.precipitation_sum) && Number.isFinite(x.temperature_2m_max)
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  return out;
}

/* ---------- component ---------- */
export function HomePage({ onNavigateToDashboard, onNavigateToAbout }: HomePageProps) {
  const [weather, setWeather] = useState<WeatherRow[]>([]);

  useEffect(() => {
    loadDelhiWeather().then(setWeather).catch(() => {});
  }, []);

  const last = weather[weather.length - 1];
  const rain12 = useMemo(
    () => weather.slice(-12).reduce((s, r) => s + (r.precipitation_sum || 0), 0),
    [weather]
  );

  return (
    <div className="space-y-10">
      {/* HERO */}
      <Hero
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToAbout={onNavigateToAbout}
      />

      {/* QUICK STATS */}
      <section className="container mx-auto px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Latest Month</CardDescription>
              <CardTitle>{last ? last.date : "—"}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Max Temp (°C)</CardDescription>
              <CardTitle>{last ? Math.round(last.temperature_2m_max) : "—"}°</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Rain (last 12 mo)</CardDescription>
              <CardTitle>{last ? Math.round(rain12) : "—"} mm</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Data Loaded</CardDescription>
              <CardTitle>{weather.length ? "Yes" : "No"}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* MINI CHART */}
      <section className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Delhi Weather Trends</CardTitle>
            <CardDescription>Max Temp & Precipitation (2000–2024)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weather.slice(-36)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="rain" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="temp"
                    type="monotone"
                    dataKey="temperature_2m_max"
                    name="Max Temp (°C)"
                    stroke="#f59e0b"
                    dot={false}
                  />
                  <Line
                    yAxisId="rain"
                    type="monotone"
                    dataKey="precipitation_sum"
                    name="Precipitation (mm)"
                    stroke="#10b981"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={onNavigateToDashboard}>Open Dashboards</Button>
              <Button variant="outline" onClick={onNavigateToAbout}>
                About the Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
