import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ScatterChart, Scatter, ZAxis, BarChart, Bar, AreaChart, Area
} from "recharts";

/* -------------------- CSV helpers -------------------- */
function parseCSV(text: string) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map(h => h.trim());
  return lines.map((ln) => {
    const cols = ln.split(",");
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = (cols[i] ?? "").trim()));
    return obj;
  });
}

async function load(path: string) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return parseCSV(await res.text());
}

/* -------------------- Loaders for your 3 datasets -------------------- */

// 1) Delhi monthly weather (columns: month, precipitation_sum, temperature_2m_max)
async function loadDelhiWeather() {
  const rows = await load("/data/delhi_monthly_weather_2000_2024.csv");
  const out = rows.map(r => {
    const iso = r["month"]; // e.g., 2000-01-01 or 2000-01
    const date = new Date(iso).toISOString().slice(0, 7); // YYYY-MM
    return {
      date,
      precipitation_sum: Number(r["precipitation_sum"]),
      temperature_2m_max: Number(r["temperature_2m_max"]),
    };
  }).filter(d => Number.isFinite(d.precipitation_sum) && Number.isFinite(d.temperature_2m_max));
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// 2) Flood risk (uses exact headers from your CSV)
async function loadFloodRisk() {
  const rows = await load("/data/flood_risk_dataset_india.csv");
  const out = rows.map(r => ({
    discharge_m3s: Number(r["River Discharge (m³/s)"]),
    waterlevel_m: Number(r["Water Level (m)"]),
    soil_type: r["Soil Type"] || "Unknown",
    flood_occurred: Number(r["Flood Occurred"]) === 1 || r["Flood Occurred"] === "1" ? 1 : 0,
  })).filter(d => Number.isFinite(d.discharge_m3s) && Number.isFinite(d.waterlevel_m));
  return out;
}

// 3) Hypsometry — sum area share by elevation band columns (numeric headers)
async function loadHypsometry() {
  const rows = await load("/data/RGI2000-v7.0-G-14_south_asia_west-hypsometry.csv");
  if (rows.length === 0) return [];

  const headers = Object.keys(rows[0]);
  const elevCols = headers.filter(h => !isNaN(Number(h))); // "2300","2350",...
  let sumAreaAll = 0;
  const sumByElev: Record<number, number> = {};

  for (const r of rows) {
    const area_km2 = Number(r["area_km2"]) || 0;
    sumAreaAll += area_km2;
    for (const e of elevCols) {
      const elev = Number(e);
      const a = Number(r[e]) || 0;
      sumByElev[elev] = (sumByElev[elev] || 0) + a;
    }
  }

  const curve = Object.keys(sumByElev)
    .map(Number)
    .sort((a, b) => a - b)
    .map(elev => ({
      elev,
      area_pct: sumAreaAll > 0 ? (sumByElev[elev] / sumAreaAll) * 100 : 0
    }));

  return curve;
}

/* -------------------- Component -------------------- */

export default function CsvCharts() {
  const [weather, setWeather] = useState<{date:string; precipitation_sum:number; temperature_2m_max:number}[]>([]);
  const [flood, setFlood] = useState<{discharge_m3s:number; waterlevel_m:number; soil_type:string; flood_occurred:1|0}[]>([]);
  const [hyps, setHyps] = useState<{elev:number; area_pct:number}[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [w, f, h] = await Promise.all([
          loadDelhiWeather(),
          loadFloodRisk(),
          loadHypsometry()
        ]);
        setWeather(w);
        setFlood(f);
        setHyps(h);
      } catch (e: any) {
        console.error(e);
        setErr(e?.message || "Failed to load data");
      }
    })();
  }, []);

  const floodYes = useMemo(() => flood.filter(d => d.flood_occurred === 1).slice(0, 2000), [flood]);
  const floodNo  = useMemo(() => flood.filter(d => d.flood_occurred === 0).slice(0, 2000), [flood]);

  const floodBySoil = useMemo(() => {
    const agg: Record<string, {soil:string; floods:number}> = {};
    for (const d of flood) {
      const k = d.soil_type || "Unknown";
      if (!agg[k]) agg[k] = { soil: k, floods: 0 };
      agg[k].floods += d.flood_occurred ? 1 : 0;
    }
    return Object.values(agg).sort((a,b)=>b.floods - a.floods).slice(0,6);
  }, [flood]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">CSV Data Dashboard</h2>

      {err && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          Error: {err}
        </div>
      )}

      <Tabs defaultValue="weather" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="flood">Flood Risk</TabsTrigger>
          <TabsTrigger value="hyps">Glacier Profiles</TabsTrigger>
        </TabsList>

        {/* WEATHER */}
        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Delhi monthly weather</CardTitle>
              <CardDescription>Max temp and precipitation (2000–2024)</CardDescription>
            </CardHeader>
            <CardContent>
              {weather.length === 0 ? (
                <div className="text-sm text-muted-foreground">Loading weather…</div>
              ) : (
                <ResponsiveContainer width="100%" height={380}>
                  <LineChart data={weather}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="temp" orientation="left" />
                    <YAxis yAxisId="rain" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="temp" type="monotone" dataKey="temperature_2m_max" name="Max Temp (°C)" stroke="#f59e0b" dot={false} />
                    <Line yAxisId="rain" type="monotone" dataKey="precipitation_sum" name="Precipitation (mm)" stroke="#10b981" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FLOOD */}
        <TabsContent value="flood">
          <Card>
            <CardHeader>
              <CardTitle>Flood relationships</CardTitle>
              <CardDescription>Discharge vs Water Level + top soils</CardDescription>
            </CardHeader>
            <CardContent>
              {flood.length === 0 ? (
                <div className="text-sm text-muted-foreground">Loading flood data…</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={340}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="discharge_m3s" name="Discharge" unit=" m³/s" />
                      <YAxis type="number" dataKey="waterlevel_m" name="Water Level" unit=" m" />
                      <ZAxis range={[60,60]} />
                      <Tooltip />
                      <Legend />
                      <Scatter name="No Flood" data={floodNo} fill="#38bdf8" />
                      <Scatter name="Flood" data={floodYes} fill="#ef4444" />
                    </ScatterChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={floodBySoil}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="soil" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="floods" name="Floods" fill="#fb7185" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* HYPSOMETRY */}
        <TabsContent value="hyps">
          <Card>
            <CardHeader>
              <CardTitle>Glacier area share by elevation</CardTitle>
              <CardDescription>RGI v7 — South Asia West</CardDescription>
            </CardHeader>
            <CardContent>
              {hyps.length === 0 ? (
                <div className="text-sm text-muted-foreground">Loading hypsometry…</div>
              ) : (
                <ResponsiveContainer width="100%" height={380}>
                  <AreaChart data={hyps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="elev" tickFormatter={(v)=>`${v} m`} />
                    <YAxis tickFormatter={(v)=>`${v}%`} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="area_pct" name="Area Share (%)" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
