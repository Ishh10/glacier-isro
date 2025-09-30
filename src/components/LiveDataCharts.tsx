import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, Area, AreaChart,
  ScatterChart, Scatter, ZAxis
} from "recharts";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

/* ========================= CSV LOADERS ========================= */

// Delhi monthly weather (2000–2024) → {date:"YYYY-MM", precipitation_sum, temperature_2m_max}
async function loadDelhiWeather() {
  const res = await fetch("/data/delhi_monthly_weather_2000_2024.csv");
  if (!res.ok) throw new Error("CSV fetch failed (Delhi weather)");
  const text = await res.text();
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map(h => h.trim());
  const monthIndex = header.indexOf("month");
  const rainIndex  = header.indexOf("precipitation_sum");
  const tmaxIndex  = header.indexOf("temperature_2m_max");

  const out: { date: string; precipitation_sum: number; temperature_2m_max: number }[] = [];
  for (const line of lines) {
    const parts = line.split(",");
    const monthIso = parts[monthIndex];
    const date = new Date(monthIso).toISOString().slice(0, 7); // "YYYY-MM"
    const rain = Number(parts[rainIndex]);
    const tmax = Number(parts[tmaxIndex]);
    if (!isNaN(rain) && !isNaN(tmax)) out.push({ date, precipitation_sum: rain, temperature_2m_max: tmax });
  }
  return out.sort((a,b) => a.date.localeCompare(b.date));
}

// Flood risk dataset → normalize to safe keys
async function loadFloodRisk() {
  const res = await fetch("/data/flood_risk_dataset_india.csv");
  if (!res.ok) throw new Error("CSV fetch failed (Flood risk)");
  const text = await res.text();
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map(h => h.trim());

  const h = (name: string) => header.indexOf(name);
  const idx = {
    rainfall: h("Rainfall (mm)"),
    temp: h("Temperature (°C)"),
    humidity: h("Humidity (%)"),
    discharge: h("River Discharge (m³/s)"),
    waterlevel: h("Water Level (m)"),
    soil: h("Soil Type"),
    land: h("Land Cover"),
    flood: h("Flood Occurred"),
  };

  const out: {
    rainfall_mm: number; temperature_c: number; humidity_pct: number;
    discharge_m3s: number; waterlevel_m: number; soil_type: string;
    land_cover: string; flood_occurred: number;
  }[] = [];

  for (const line of lines) {
    const cols = line.split(",");
    const obj = {
      rainfall_mm: Number(cols[idx.rainfall]),
      temperature_c: Number(cols[idx.temp]),
      humidity_pct: Number(cols[idx.humidity]),
      discharge_m3s: Number(cols[idx.discharge]),
      waterlevel_m: Number(cols[idx.waterlevel]),
      soil_type: (cols[idx.soil] || "").trim(),
      land_cover: (cols[idx.land] || "").trim(),
      flood_occurred: Number(cols[idx.flood]),
    };
    if (
      Number.isFinite(obj.discharge_m3s) &&
      Number.isFinite(obj.waterlevel_m) &&
      Number.isFinite(obj.rainfall_mm)
    ) out.push(obj);
  }
  return out.slice(0, 3000); // cap for perf
}

// Hypsometry: sum area across elevation bands and produce percent by elevation
async function loadHypsometry() {
  const res = await fetch("/data/RGI2000-v7.0-G-14_south_asia_west-hypsometry.csv");
  if (!res.ok) throw new Error("CSV fetch failed (Hypsometry)");
  const text = await res.text();
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()!.split(",").map(h => h.trim());

  const rgiIdIdx = header.indexOf("rgi_id");
  const areaIdx = header.indexOf("area_km2");

  const elevCols = header
    .map((name, i) => ({ name, i }))
    .filter(o => !isNaN(Number(o.name)));

  let totalGlaciers = 0;
  let sumAreaAll = 0;
  let sumByElev: Record<number, number> = {};

  for (const line of lines) {
    const cols = line.split(",");
    if (!cols[rgiIdIdx]) continue;
    totalGlaciers += 1;
    const area = Number(cols[areaIdx]) || 0;
    sumAreaAll += area;
    for (const ec of elevCols) {
      const elev = Number(ec.name);
      const a = Number(cols[ec.i]) || 0;
      sumByElev[elev] = (sumByElev[elev] || 0) + a;
    }
  }

  const curve = Object.keys(sumByElev)
    .map(k => Number(k))
    .sort((a,b) => a - b)
    .map(elev => {
      const area_km2 = sumByElev[elev];
      const area_pct = sumAreaAll > 0 ? (area_km2 / sumAreaAll) * 100 : 0;
      return { elev, area_km2, area_pct };
    });

  const meanAreaKm2 = sumAreaAll / Math.max(1, totalGlaciers);
  return { curve, totalGlaciers, meanAreaKm2: +meanAreaKm2.toFixed(3) };
}

/* ========================= DEMO DATA (KEEP) ========================= */

// Simulated live updates for other tabs (keep)
const generateRealTimeData = () => {
  const now = new Date();
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.getHours() + ':00',
      gangaFlow: 1200 + Math.sin(i * 0.3) * 200 + Math.random() * 50,
      yamunaFlow: 180 + Math.sin(i * 0.4) * 30 + Math.random() * 20,
      sutlejFlow: 850 + Math.sin(i * 0.2) * 150 + Math.random() * 40,
      beasFlow: 420 + Math.sin(i * 0.35) * 80 + Math.random() * 30,
      temperature: 18 + Math.sin(i * 0.1) * 4 + Math.random() * 2,
      rainfall: Math.random() < 0.2 ? Math.random() * 15 : 0
    });
  }
  return data;
};

const reservoirData = [
  { name: 'Bhakra Dam', current: 85, capacity: 9340, optimal: 80, critical: 30, state: 'Punjab/Himachal' },
  { name: 'Tehri Dam', current: 72, capacity: 4000, optimal: 75, critical: 35, state: 'Uttarakhand' },
  { name: 'Pong Dam', current: 68, capacity: 8570, optimal: 70, critical: 25, state: 'Himachal Pradesh' },
  { name: 'Ranjit Sagar', current: 91, capacity: 3020, optimal: 85, critical: 40, state: 'Punjab' },
  { name: 'Nathpa Jhakri', current: 77, capacity: 820, optimal: 75, critical: 45, state: 'Himachal Pradesh' }
];

const monthlyFlowData = [
  { month: 'Jan', ganga: 800, yamuna: 120, sutlej: 600, beas: 280, snowmelt: 'Low' },
  { month: 'Feb', ganga: 750, yamuna: 110, sutlej: 580, beas: 260, snowmelt: 'Low' },
  { month: 'Mar', ganga: 900, yamuna: 140, sutlej: 720, beas: 320, snowmelt: 'Starting' },
  { month: 'Apr', ganga: 1100, yamuna: 180, sutlej: 900, beas: 420, snowmelt: 'Medium' },
  { month: 'May', ganga: 1300, yamuna: 220, sutlej: 1100, beas: 520, snowmelt: 'High' },
  { month: 'Jun', ganga: 1800, yamuna: 280, sutlej: 1400, beas: 680, snowmelt: 'Peak' },
  { month: 'Jul', ganga: 2200, yamuna: 350, sutlej: 1200, beas: 580, snowmelt: 'Monsoon' },
  { month: 'Aug', ganga: 2400, yamuna: 380, sutlej: 1100, beas: 520, snowmelt: 'Monsoon' },
  { month: 'Sep', ganga: 1900, yamuna: 320, sutlej: 1000, beas: 480, snowmelt: 'Reducing' },
  { month: 'Oct', ganga: 1400, yamuna: 250, sutlej: 850, beas: 400, snowmelt: 'Low' },
  { month: 'Nov', ganga: 1100, yamuna: 190, sutlej: 750, beas: 350, snowmelt: 'Minimal' },
  { month: 'Dec', ganga: 900, yamuna: 150, sutlej: 650, beas: 300, snowmelt: 'Minimal' }
];

/* ========================= COMPONENT ========================= */

export function LiveDataCharts() {
  // Demo (keep)
  const [liveData, setLiveData] = useState(generateRealTimeData());
  const [isLive, setIsLive] = useState(false);

  // Real CSV states
  const [weatherData, setWeatherData] = useState<{ date: string; precipitation_sum: number; temperature_2m_max: number }[]>([]);
  const [floodData, setFloodData] = useState<any[]>([]);
  const [hypsometry, setHypsometry] = useState<{ curve: { elev: number; area_km2: number; area_pct: number }[]; totalGlaciers: number; meanAreaKm2: number } | null>(null);

  /* Live demo timer */
  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(() => setLiveData(generateRealTimeData()), 5000);
    }
    return () => interval && clearInterval(interval);
  }, [isLive]);

  /* Load CSVs once */
  useEffect(() => {
    loadDelhiWeather().then(setWeatherData).catch((e) => console.error(e));
    loadFloodRisk().then(setFloodData).catch((e) => console.error(e));
    loadHypsometry().then(setHypsometry).catch((e) => console.error(e));
  }, []);

  /* Flood aggregations */
  const floodBySoil = useMemo(() => {
    const by: Record<string, { soil: string; floods: number; samples: number }> = {};
    for (const r of floodData) {
      const key = r.soil_type || "Unknown";
      if (!by[key]) by[key] = { soil: key, floods: 0, samples: 0 };
      by[key].samples += 1;
      by[key].floods += Number(r.flood_occurred ? 1 : 0);
    }
    return Object.values(by).sort((a, b) => b.floods - a.floods).slice(0, 6);
  }, [floodData]);

  const floodYes = useMemo(() => floodData.filter(d => d.flood_occurred === 1).slice(0, 2000), [floodData]);
  const floodNo  = useMemo(() => floodData.filter(d => d.flood_occurred === 0).slice(0, 2000), [floodData]);

  const getReservoirColor = (current: number, optimal: number, critical: number) => {
    if (current >= optimal) return '#10b981';
    if (current >= critical + 10) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Live North Indian Water Data</h2>
        <div className="flex gap-2">
          <Button variant={isLive ? "default" : "outline"} onClick={() => setIsLive(!isLive)} className={isLive ? "bg-green-600 hover:bg-green-700" : ""}>
            {isLive ? '🔴 Live' : '▶️ Start Live'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="rivers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="rivers">River Flow</TabsTrigger>
          <TabsTrigger value="reservoirs">Reservoirs</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="flood">Flood Risk</TabsTrigger>
          <TabsTrigger value="hypsometry">Glacier Profiles</TabsTrigger>
        </TabsList>

        {/* RIVERS (demo) */}
        <TabsContent value="rivers">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time River Flow Data</CardTitle>
              <CardDescription>Live flow measurements from major North Indian rivers (cusecs)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={liveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${Math.round(value as number)} cusecs`, name]} />
                  <Legend />
                  <Line type="monotone" dataKey="gangaFlow" stroke="#0ea5e9" name="Ganga at Haridwar" strokeWidth={2} />
                  <Line type="monotone" dataKey="yamunaFlow" stroke="#06b6d4" name="Yamuna at Delhi" strokeWidth={2} />
                  <Line type="monotone" dataKey="sutlejFlow" stroke="#0891b2" name="Sutlej at Bhakra" strokeWidth={2} />
                  <Line type="monotone" dataKey="beasFlow" stroke="#0284c7" name="Beas at Pong" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">Ganga Current</div>
                  <div className="text-xl font-bold text-blue-900">{Math.round(liveData[liveData.length - 1]?.gangaFlow || 0)}</div>
                  <div className="text-blue-600">cusecs</div>
                </div>
                <div className="text-center p-2 bg-cyan-50 rounded">
                  <div className="font-medium text-cyan-800">Yamuna Current</div>
                  <div className="text-xl font-bold text-cyan-900">{Math.round(liveData[liveData.length - 1]?.yamunaFlow || 0)}</div>
                  <div className="text-cyan-600">cusecs</div>
                </div>
                <div className="text-center p-2 bg-sky-50 rounded">
                  <div className="font-medium text-sky-800">Sutlej Current</div>
                  <div className="text-xl font-bold text-sky-900">{Math.round(liveData[liveData.length - 1]?.sutlejFlow || 0)}</div>
                  <div className="text-sky-600">cusecs</div>
                </div>
                <div className="text-center p-2 bg-indigo-50 rounded">
                  <div className="font-medium text-indigo-800">Beas Current</div>
                  <div className="text-xl font-bold text-indigo-900">{Math.round(liveData[liveData.length - 1]?.beasFlow || 0)}</div>
                  <div className="text-indigo-600">cusecs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESERVOIRS (demo) */}
        <TabsContent value="reservoirs">
          <Card>
            <CardHeader>
              <CardTitle>North Indian Reservoir Status</CardTitle>
              <CardDescription>Current water levels in major dams and reservoirs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reservoirData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [name === 'current' ? `${value}% Full` : `${value}% Level`, name === 'current' ? 'Current Level' : 'Optimal Level']} />
                  <Legend />
                  <Bar dataKey="current" fill="#0ea5e9" name="Current Level" />
                  <Bar dataKey="optimal" fill="#10b981" name="Optimal Level" opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservoirData.map((r) => (
                  <div key={r.name} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{r.state}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" style={{ width: `${r.current}%`, backgroundColor: getReservoirColor(r.current, r.optimal, r.critical) }} />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{r.current}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Capacity: {r.capacity} MCM</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEASONAL (demo) */}
        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Flow Patterns</CardTitle>
              <CardDescription>Historical monthly averages showing seasonal variation patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} cusecs`, name]} />
                  <Legend />
                  <Area type="monotone" dataKey="ganga" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.7} name="Ganga" />
                  <Area type="monotone" dataKey="sutlej" stackId="2" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.7} name="Sutlej" />
                  <Area type="monotone" dataKey="beas" stackId="3" stroke="#0891b2" fill="#0891b2" fillOpacity={0.7} name="Beas" />
                  <Area type="monotone" dataKey="yamuna" stackId="4" stroke="#0284c7" fill="#0284c7" fillOpacity={0.7} name="Yamuna" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                {monthlyFlowData.map((d) => (
                  <div key={d.month} className="text-center p-2 bg-slate-50 rounded">
                    <div className="font-medium">{d.month}</div>
                    <div className="text-muted-foreground">Snowmelt: {d.snowmelt}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WEATHER (REAL) */}
        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Regional Weather Monitoring</CardTitle>
              <CardDescription>Delhi monthly max temp and precipitation (2000–2024)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="rain" orientation="right" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "temperature_2m_max" ? `${Math.round(value as number)}°C` : `${Math.round(value as number)} mm`,
                      name === "temperature_2m_max" ? "Max Temp" : "Precipitation",
                    ]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line yAxisId="temp" type="monotone" dataKey="temperature_2m_max" stroke="#f59e0b" name="Max Temp (°C)" strokeWidth={2} dot={false} />
                  <Line yAxisId="rain" type="monotone" dataKey="precipitation_sum" stroke="#10b981" name="Precipitation (mm)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-orange-50 rounded">
                  <div className="font-medium text-orange-800">Last Month Max Temp</div>
                  <div className="text-xl font-bold text-orange-900">
                    {Math.round(weatherData[weatherData.length - 1]?.temperature_2m_max || 0)}°C
                  </div>
                  <div className="text-orange-600">Delhi</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="font-medium text-green-800">Rain (last 12 months)</div>
                  <div className="text-xl font-bold text-green-900">
                    {Math.round(weatherData.slice(-12).reduce((sum, d) => sum + (d.precipitation_sum || 0), 0))}mm
                  </div>
                  <div className="text-green-600">Total Precipitation</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">Data Source</div>
                  <div className="text-sm font-semibold text-blue-900">delhi_monthly_weather_2000_2024.csv</div>
                  <div className="text-blue-600">Monthly aggregate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FLOOD RISK (REAL) */}
        <TabsContent value="flood">
          <Card>
            <CardHeader>
              <CardTitle>Flood Risk Analysis</CardTitle>
              <CardDescription>Relationships from national flood attributes (n≈{floodData.length})</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Scatter: Discharge vs Water Level, colored by Flood */}
                <ResponsiveContainer width="100%" height={360}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="discharge_m3s" name="Discharge" unit=" m³/s" />
                    <YAxis type="number" dataKey="waterlevel_m" name="Water Level" unit=" m" />
                    <ZAxis range={[60, 60]} />
                    <Tooltip formatter={(v: any, n: any) => [typeof v === "number" ? v.toFixed(1) : v, n]} />
                    <Legend />
                    <Scatter name="No Flood" data={floodNo} fill="#38bdf8" />
                    <Scatter name="Flood" data={floodYes} fill="#ef4444" />
                  </ScatterChart>
                </ResponsiveContainer>

                {/* Bar: Flood count by Soil Type (top 6) */}
                <ResponsiveContainer width="100%" height={360}>
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* HYPSOMETRY (REAL) */}
        <TabsContent value="hypsometry">
          <Card>
            <CardHeader>
              <CardTitle>Glacier Area vs Elevation</CardTitle>
              <CardDescription>Aggregated distribution across South Asia West (RGI v7)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={hypsometry?.curve || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="elev" tickFormatter={(v) => `${v}m`} />
                  <YAxis tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: any) => [`${(v as number).toFixed(3)}%`, "Area Share"]} labelFormatter={(l) => `Elevation: ${l} m`} />
                  <Legend />
                  <Area type="monotone" dataKey="area_pct" name="Area Share (%)" fill="#93c5fd" stroke="#3b82f6" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="font-medium text-slate-800">Glaciers Count</div>
                  <div className="text-xl font-bold text-slate-900">{hypsometry?.totalGlaciers ?? "…"}</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="font-medium text-slate-800">Mean Glacier Area</div>
                  <div className="text-xl font-bold text-slate-900">{hypsometry ? `${hypsometry.meanAreaKm2} km²` : "…"}</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="font-medium text-slate-800">Bins</div>
                  <div className="text-xl font-bold text-slate-900">{hypsometry?.curve?.length ?? "…"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
