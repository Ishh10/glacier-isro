import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { getClimateData } from "../../services/api"; // <-- Import API function
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; // Assuming standard Shadcn table components
import { Loader2 } from "lucide-react"; // Assuming lucide-react is used for icons
import { ScrollArea } from "../ui/scroll-area"; // Assuming scroll-area component

interface ClimateDataPageProps {
  onNavigateBack: () => void;
}

// Type definition for the data fetched from the backend (must match Python output)
type SeasonalDataRow = {
  year?: number; 
  season?: string;
  rain: number;
  temp: number;
  lag_discharge: number;
  discharge: number; // Observed Discharge (Target)
  [key: string]: any; 
};

export function ClimateDataPage({ onNavigateBack }: ClimateDataPageProps) {
  const [data, setData] = useState<SeasonalDataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define columns for the table with keys matching the harmonized Python output
  const tableColumns = [
    { key: "year", label: "Year" },
    { key: "season", label: "Season" },
    { key: "temp", label: "Avg. Temp (°C)" },
    { key: "rain", label: "Rainfall (mm)" },
    { key: "lag_discharge", label: "Prev. Discharge (CMS)" },
    { key: "discharge", label: "Obs. Discharge (CMS)" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rawData = await getClimateData();
        setData(rawData as SeasonalDataRow[]);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch climate data:", err);
        setError("Failed to load historical climate data. Ensure backend is running.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const renderDataTable = () => {
    if (loading) {
      return <div className="text-center p-8"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /> <p className="mt-2 text-sm text-muted-foreground">Loading historical data...</p></div>;
    }

    if (error) {
      return <p className="text-red-600 bg-red-50 p-4 border border-red-300 rounded text-center">{error}</p>;
    }

    if (data.length === 0) {
      return <p className="text-center p-8 text-gray-500">No data available from the backend source.</p>;
    }

    // Filter to only include the keys defined in the tableColumns and actually present in data
    const finalData = data.map(row => 
        tableColumns.reduce((acc, col) => {
            acc[col.key as keyof SeasonalDataRow] = row[col.key as keyof SeasonalDataRow];
            return acc;
        }, {} as SeasonalDataRow)
    );
    

    return (
        <ScrollArea className="h-[400px] w-full border rounded-lg shadow-md">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
                        <TableRow>
                            {tableColumns.map((col) => (
                                <TableHead key={col.key} className="text-primary font-bold whitespace-nowrap">
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {finalData.map((row, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                                {tableColumns.map((col) => (
                                    <TableCell key={col.key} className="whitespace-nowrap text-sm">
                                        {/* Format numbers for display, rounding decimals for clarity */}
                                        {row[col.key as keyof SeasonalDataRow] !== undefined ? 
                                            typeof row[col.key as keyof SeasonalDataRow] === 'number'
                                                ? (row[col.key as keyof SeasonalDataRow] as number).toFixed(row[col.key as keyof SeasonalDataRow] > 100 ? 1 : 3)
                                                : String(row[col.key as keyof SeasonalDataRow])
                                            : 'N/A'
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    );
  };
    
  return (
    <div className="pt-16">
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={onNavigateBack}
              className="mb-8"
            >
              ← Back to Features
            </Button>
            
            <div className="text-center space-y-4 mb-16">
              <div className="text-6xl mb-4">🌦️</div>
              <h1 className="text-3xl lg:text-4xl text-foreground">
                North Indian Climate Data Integration
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive integration of meteorological data from North Indian weather stations, focusing on Himalayan watersheds feeding the Ganga, Yamuna, and Indus river systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Real North Indian Data Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">IMD Weather Stations (Delhi, Chandigarh, Shimla)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">ISRO RESOURCESAT-2A Satellite Data</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Central Water Commission Historical Records</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">MODIS Snow Cover - Gangotri & Yamunotri</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Doppler Weather Radar (Delhi, Chandigarh)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Himalayan Region Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temperature (Uttarakhand Hills)</span>
                      <span className="text-xs text-muted-foreground">-5°C to 25°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monsoon Precipitation</span>
                      <span className="text-xs text-muted-foreground">600-2000mm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Snow Depth (Above 3000m)</span>
                      <span className="text-xs text-muted-foreground">0.5-5m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Solar Radiation (Ladakh)</span>
                      <span className="text-xs text-muted-foreground">High UV</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wind (Western Disturbances)</span>
                      <span className="text-xs text-muted-foreground">20-80 km/h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* NEW SECTION: Historical Data Table */}
            <Card className="border-0 shadow-sm bg-white mb-12">
                <CardHeader>
                    <CardTitle>Historical Seasonal Data (Table View)</CardTitle>
                    <CardDescription>
                        This is the full raw data table served by the FastAPI `/climate-data` endpoint.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {renderDataTable()}
                </CardContent>
            </Card>


            <Card className="border-0 shadow-sm bg-white mb-12">
              <CardHeader>
                <CardTitle>Real-Time Data Integration</CardTitle>
                <CardDescription>
                  Live data streams from authentic North Indian meteorological networks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🏔️</span>
                    </div>
                    <h3 className="font-medium">Himalayan Stations</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time data from Gangotri (3,100m), Badrinath (3,300m), and Kedarnath (3,584m) weather stations
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🛰️</span>
                    </div>
                    <h3 className="font-medium">ISRO Satellite Network</h3>
                    <p className="text-sm text-muted-foreground">
                      INSAT-3DR and Oceansat-2 providing snow cover and precipitation data for North India
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🌊</span>
                    </div>
                    <h3 className="font-medium">River Gauge Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Central Water Commission stations at Haridwar, Rishikesh, and Delhi monitoring Ganga flow
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white mb-12">
              <CardHeader>
                <CardTitle>North Indian Climate Zones Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Himalayan Regions</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Uttarakhand: Gangotri-Yamunotri glacier systems</li>
                      <li>• Himachal Pradesh: Beas, Sutlej, and Ravi watersheds</li>
                      <li>• Jammu & Kashmir: Chenab and Jhelum river basins</li>
                      <li>• Ladakh: Trans-Himalayan cold desert climate</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Plains & Urban Centers</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Delhi NCR: Urban heat island monitoring</li>
                      <li>• Punjab: Agricultural irrigation demand prediction</li>
                      <li>• Haryana: Yamuna basin water availability</li>
                      <li>• Western UP: Ganga tributary confluence zones</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Regional Impact & Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Water Resource Management</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Bhakra-Nangal reservoir optimization</li>
                      <li>• Tehri Dam operation planning</li>
                      <li>• Delhi water supply forecasting</li>
                      <li>• Canal irrigation scheduling (Punjab/Haryana)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Agricultural Planning</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Rabi crop water requirement (wheat belt)</li>
                      <li>• Kharif season monsoon dependency</li>
                      <li>• Fruit orchards in Himachal hills</li>
                      <li>• Sugarcane irrigation in Western UP</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
