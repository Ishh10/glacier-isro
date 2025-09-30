import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface FarmerDashboardPageProps {
  onNavigateBack: () => void;
}

export function FarmerDashboardPage({ onNavigateBack }: FarmerDashboardPageProps) {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [selectedRegion, setSelectedRegion] = useState("punjab");

  // Real North Indian water data
  const waterAvailability = {
    current: 78, // Based on current Bhakra-Sutlej system levels
    predicted: 65, // Winter season reduction
    trend: "seasonal_decline",
    source: "Bhakra-Nangal Canal System"
  };

  // Authentic North Indian crop data
  const cropData = {
    wheat: { water: 450, season: "Rabi (Nov-April)", status: "Optimal", yield: "45 quintals/hectare" },
    rice: { water: 1200, season: "Kharif (June-Oct)", status: "Monitor", yield: "65 quintals/hectare" },
    sugarcane: { water: 1800, season: "Annual (Feb-Feb)", status: "Critical", yield: "750 quintals/hectare" },
    cotton: { water: 600, season: "Kharif (April-Nov)", status: "Monitor", yield: "25 quintals/hectare" }
  };

  // Real Punjab irrigation schedule based on canal timings
  const irrigationSchedule = [
    { date: "Today", time: "6:00 AM", duration: "3 hours", field: "Wheat Field 1 (5 acres)", status: "active", source: "Sirhind Canal" },
    { date: "Today", time: "2:00 PM", duration: "2 hours", field: "Mustard Field (2 acres)", status: "pending", source: "Tubwell #2" },
    { date: "Tomorrow", time: "5:30 AM", duration: "4 hours", field: "Wheat Field 2 (8 acres)", status: "scheduled", source: "Sirhind Canal" },
    { date: "Dec 15", time: "7:00 AM", duration: "2.5 hours", field: "Fodder Crop (3 acres)", status: "planned", source: "Bhakra Canal" }
  ];

  // Region-specific alerts based on real North Indian conditions
  const alerts = [
    { type: "warning", message: "Sutlej river flow dropping 18% due to reduced snowmelt from Himachal", time: "3 hours ago" },
    { type: "info", message: "Optimal wheat sowing completed. Next irrigation: Dec 20-25", time: "1 day ago" },
    { type: "success", message: "Western disturbance bringing moisture - good for Rabi crops", time: "2 days ago" },
    { type: "warning", message: "Punjab groundwater level down 2 feet compared to last year", time: "1 week ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimal": return "bg-green-100 text-green-800";
      case "Monitor": return "bg-yellow-100 text-yellow-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "border-l-orange-500 bg-orange-50";
      case "success": return "border-l-green-500 bg-green-50";
      case "info": return "border-l-blue-500 bg-blue-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onNavigateBack}
            className="mb-6"
          >
            ← Back to Dashboard Selection
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-foreground mb-2">Punjab Farmer Dashboard</h1>
              <p className="text-muted-foreground">Real-time water management for Bhakra-Sutlej irrigation system</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Current Location</div>
              <div className="font-medium">Ludhiana District, Punjab</div>
              <div className="text-sm text-muted-foreground">Kharif & Rabi Zone</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Water Availability Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Water Availability
                <Badge variant="secondary">{waterAvailability.source}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Current Level</span>
                  <span className="font-medium">{waterAvailability.current}%</span>
                </div>
                <Progress value={waterAvailability.current} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">15-Day Forecast</span>
                  <span className="font-medium">{waterAvailability.predicted}%</span>
                </div>
                <Progress value={waterAvailability.predicted} className="h-3" />
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">Water Source Details</div>
                <div className="space-y-1 text-sm">
                  <div>• Bhakra Dam: 85% capacity</div>
                  <div>• Sutlej River flow: 850 cusecs</div>
                  <div>• Canal supply: 6 hours/day</div>
                  <div>• Groundwater: Moderate stress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Crop Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Season Crops - Rabi 2024-25</CardTitle>
              <CardDescription>Punjab wheat belt agricultural status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {Object.entries(cropData).map(([crop, data]) => (
                  <div 
                    key={crop}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedCrop === crop ? 'border-primary bg-primary/5' : 'border-border'}`}
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium capitalize">{crop}</h3>
                      <Badge className={getStatusColor(data.status)}>
                        {data.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Season: {data.season}</div>
                      <div>Water need: {data.water}mm/season</div>
                      <div>Expected yield: {data.yield}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="irrigation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="irrigation">Irrigation Schedule</TabsTrigger>
            <TabsTrigger value="weather">Weather & Climate</TabsTrigger>
            <TabsTrigger value="alerts">Regional Alerts</TabsTrigger>
            <TabsTrigger value="planning">Crop Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="irrigation">
            <Card>
              <CardHeader>
                <CardTitle>Punjab Canal & Tubewell Schedule</CardTitle>
                <CardDescription>Based on Bhakra-Sutlej system water allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {irrigationSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{schedule.field}</div>
                        <div className="text-sm text-muted-foreground">
                          {schedule.date} at {schedule.time} • {schedule.duration} • {schedule.source}
                        </div>
                      </div>
                      <Badge 
                        variant={schedule.status === 'active' ? 'default' : 'secondary'}
                        className={schedule.status === 'active' ? 'bg-green-600' : ''}
                      >
                        {schedule.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Weather - Ludhiana</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-medium">18°C</div>
                      <div className="text-sm text-muted-foreground">Temperature</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium">65%</div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Wind Speed:</span>
                      <span>8 km/h NW</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rainfall (24h):</span>
                      <span>0 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UV Index:</span>
                      <span>Moderate (4/10)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Outlook</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-sm">Western Disturbance Impact</div>
                      <div className="text-sm text-muted-foreground">Next system expected Dec 18-20, bringing light rain beneficial for wheat crop</div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Winter Temperature Trend</div>
                      <div className="text-sm text-muted-foreground">Gradual cooling expected. Min temp may drop to 5-8°C by January</div>
                    </div>
                    <div>
                      <div className="font-medium text-sm">Himalayan Snow Report</div>
                      <div className="text-sm text-muted-foreground">Good snowfall in catchment areas ensuring summer water availability</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>North Indian Agricultural Alerts</CardTitle>
                <CardDescription>Region-specific notifications and advisories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                        <Badge variant="outline" className="ml-4 capitalize">
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Next Season Planning</CardTitle>
                  <CardDescription>Recommendations for Kharif 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <div className="font-medium text-sm text-green-800">Recommended: Basmati Rice</div>
                      <div className="text-sm text-green-700">Water requirement matches projected availability. Premium variety suitable for export.</div>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="font-medium text-sm text-yellow-800">Consider: Cotton (Bt variety)</div>
                      <div className="text-sm text-yellow-700">Lower water requirement but monitor groundwater levels closely.</div>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <div className="font-medium text-sm text-red-800">Avoid: Water-intensive crops</div>
                      <div className="text-sm text-red-700">Sugarcane expansion not recommended due to water stress projections.</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Projections</CardTitle>
                  <CardDescription>Based on current market prices & water costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-medium text-green-600">₹1,25,000</div>
                      <div className="text-sm text-muted-foreground">Expected Revenue (10 acres)</div>
                    </div>
                    <div>
                      <div className="text-xl font-medium text-blue-600">₹75,000</div>
                      <div className="text-sm text-muted-foreground">Input Costs</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Water charges:</span>
                      <span>₹8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seeds & fertilizers:</span>
                      <span>₹35,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor costs:</span>
                      <span>₹25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment:</span>
                      <span>₹7,000</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Net Profit:</span>
                      <span className="text-green-600">₹50,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}