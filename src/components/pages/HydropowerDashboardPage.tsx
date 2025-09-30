import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface HydropowerDashboardPageProps {
  onNavigateBack: () => void;
}

export function HydropowerDashboardPage({ onNavigateBack }: HydropowerDashboardPageProps) {
  const [selectedPlant, setSelectedPlant] = useState("tehri");

  const powerPlants = {
    tehri: { capacity: 1000, generation: 850, efficiency: 85, reservoir: 92 },
    bhakra: { capacity: 1325, generation: 1180, efficiency: 89, reservoir: 78 },
    nathpa: { capacity: 1500, generation: 1350, efficiency: 90, reservoir: 85 }
  };

  const generationForecast = [
    { period: "Next 7 days", predicted: "890 MW", confidence: "95%" },
    { period: "Next 30 days", predicted: "825 MW", confidence: "87%" },
    { period: "Next 90 days", predicted: "720 MW", confidence: "78%" }
  ];

  const maintenanceSchedule = [
    { unit: "Turbine 1", date: "Dec 15, 2024", duration: "3 days", type: "Routine" },
    { unit: "Generator 2", date: "Jan 8, 2025", duration: "5 days", type: "Major" },
    { unit: "Spillway Gates", date: "Feb 20, 2025", duration: "2 days", type: "Inspection" }
  ];

  const operationalAlerts = [
    { level: "Warning", message: "Reservoir level approaching spillway threshold", time: "30 min ago" },
    { level: "Info", message: "Peak demand period starting in 2 hours", time: "1 hour ago" },
    { level: "Success", message: "Monthly generation target achieved", time: "3 hours ago" }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case "Warning": return "border-l-orange-500 bg-orange-50";
      case "Info": return "border-l-blue-500 bg-blue-50";
      case "Success": return "border-l-green-500 bg-green-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <div className="pt-16">
      <section className="py-8 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="outline" 
                onClick={onNavigateBack}
              >
                ← Back to Dashboard Selection
              </Button>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">⚡ Hydropower Dashboard</Badge>
                <Badge variant="secondary">Real-time Operations</Badge>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Dashboard Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Power Plant Overview */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>⚡</span>
                      <span>Power Generation Status</span>
                    </CardTitle>
                    <CardDescription>Real-time monitoring of hydropower facilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {Object.entries(powerPlants).map(([plant, data]) => (
                        <Card 
                          key={plant}
                          className={`cursor-pointer transition-all ${selectedPlant === plant ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}
                          onClick={() => setSelectedPlant(plant)}
                        >
                          <CardContent className="pt-4">
                            <div className="text-center space-y-2">
                              <h3 className="font-medium capitalize">{plant} Dam</h3>
                              <div className="text-2xl font-bold text-primary">{data.generation} MW</div>
                              <div className="text-sm text-muted-foreground">Current Output</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Selected Plant Details */}
                    <div className="space-y-4">
                      <h3 className="font-medium capitalize">{selectedPlant} Dam - Detailed Metrics</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Generation Efficiency</span>
                            <span className="font-medium">{powerPlants[selectedPlant].efficiency}%</span>
                          </div>
                          <Progress value={powerPlants[selectedPlant].efficiency} className="h-2" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Reservoir Level</span>
                            <span className="font-medium">{powerPlants[selectedPlant].reservoir}%</span>
                          </div>
                          <Progress value={powerPlants[selectedPlant].reservoir} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Generation Forecast */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle>Power Generation Forecast</CardTitle>
                    <CardDescription>AI-powered predictions based on water flow data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generationForecast.map((forecast, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{forecast.period}</div>
                          <div className="text-sm text-muted-foreground">Confidence: {forecast.confidence}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium text-primary">{forecast.predicted}</div>
                          <div className="text-sm text-muted-foreground">Avg Output</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Maintenance Schedule */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <CardDescription>Planned maintenance activities and inspections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {maintenanceSchedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{item.unit}</div>
                          <div className="text-sm text-muted-foreground">{item.date} - {item.duration}</div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant="outline">
                      Schedule New Maintenance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Live Metrics */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Live Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Capacity</span>
                      <span className="font-medium">3,825 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Output</span>
                      <span className="font-medium text-green-600">3,380 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Load Factor</span>
                      <span className="font-medium">88.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Revenue Today</span>
                      <span className="font-medium text-green-600">₹2.4 Cr</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Operational Alerts */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Operational Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {operationalAlerts.map((alert, index) => (
                      <div key={index} className={`p-3 border-l-4 rounded-lg ${getAlertColor(alert.level)}`}>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Controls */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      🎛️ Adjust Generation
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      💧 Manage Water Release
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      📊 Export Performance Data
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      🔧 Emergency Shutdown
                    </Button>
                  </CardContent>
                </Card>

                {/* Environmental Monitoring */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">CO₂ Avoided</span>
                      <span className="font-medium text-green-600">2,450 tons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Fish Ladder Usage</span>
                      <span className="font-medium">Normal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Downstream Flow</span>
                      <span className="font-medium">85 m³/s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Siltation Level</span>
                      <span className="font-medium text-orange-600">Moderate</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}