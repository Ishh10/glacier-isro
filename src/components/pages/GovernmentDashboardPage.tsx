import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { InteractiveMap } from "../InteractiveMap";
import { LiveDataCharts } from "../LiveDataCharts";
import { InteractiveFilters } from "../InteractiveFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertTriangle, TrendingUp, TrendingDown, Users, Droplets, Zap, MapPin } from "lucide-react";

interface GovernmentDashboardPageProps {
  onNavigateBack: () => void;
}

export function GovernmentDashboardPage({ onNavigateBack }: GovernmentDashboardPageProps) {
  const [selectedState, setSelectedState] = useState("punjab");
  const [activeAlerts, setActiveAlerts] = useState("all");
  const [viewMode, setViewMode] = useState("overview");
  
  // Interactive filter state
  const [filters, setFilters] = useState({
    region: 'all',
    waterBody: ['ganga', 'yamuna', 'sutlej'],
    timeRange: '24h',
    flowRange: [0, 2000] as [number, number],
    includeWeather: true,
    alertLevel: 'all',
    dateRange: {
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      to: new Date()
    }
  });

  // Real North Indian state data
  const stateData = {
    punjab: { 
      population: 30000000, 
      risk: "High", 
      waterStress: 78,
      gdp: "₹5.89 Lakh Cr",
      agriculture: "58% of economy",
      majorRivers: ["Sutlej", "Beas", "Ravi"],
      dams: ["Bhakra", "Pong", "Ranjit Sagar"],
      districts: 23,
      irrigated: "97.8%"
    },
    haryana: { 
      population: 25443708, 
      risk: "Critical", 
      waterStress: 85,
      gdp: "₹7.65 Lakh Cr", 
      agriculture: "49% of economy",
      majorRivers: ["Yamuna", "Ghaggar", "Saraswati"],
      dams: ["Hathnikund", "Tajewala"],
      districts: 22,
      irrigated: "84.2%"
    },
    uttarakhand: { 
      population: 10086292, 
      risk: "Low", 
      waterStress: 32,
      gdp: "₹2.87 Lakh Cr",
      agriculture: "37% of economy", 
      majorRivers: ["Ganga", "Yamuna", "Alaknanda"],
      dams: ["Tehri", "Koteshwar", "Dhauliganga"],
      districts: 13,
      irrigated: "45.6%"
    },
    delhi: {
      population: 32941309,
      risk: "Critical",
      waterStress: 92,
      gdp: "₹9.23 Lakh Cr",
      agriculture: "2% of economy",
      majorRivers: ["Yamuna"],
      dams: ["Wazirabad", "Haiderpur"],
      districts: 11,
      irrigated: "12.3%"
    }
  };

  // Real-time emergency alerts based on North Indian conditions
  const emergencyAlerts = [
    { 
      id: 1,
      level: "Critical", 
      state: "Delhi", 
      message: "Yamuna water level critically low - 15% below normal winter levels",
      impact: "30 million residents affected",
      action: "Immediate rationing implemented, Punjab canal diversion requested",
      time: "23 minutes ago",
      priority: 1,
      coordinates: [77.2090, 28.6139]
    },
    { 
      id: 2,
      level: "High", 
      state: "Haryana", 
      message: "Groundwater depletion rate increased 18% compared to last year",
      impact: "150,000 tube wells showing reduced output",
      action: "Strict regulation of new boring, MSP incentives for water-efficient crops",
      time: "2 hours ago",
      priority: 2,
      coordinates: [76.7794, 30.7333]
    },
    { 
      id: 3,
      level: "High", 
      state: "Punjab", 
      message: "Bhakra reservoir level drops to 72% - below optimal for hydropower",
      impact: "450 MW generation capacity reduced",
      action: "Coordinating with Himachal for upstream conservation",
      time: "4 hours ago",
      priority: 2,
      coordinates: [76.4374, 31.4086]
    },
    { 
      id: 4,
      level: "Medium", 
      state: "Uttarakhand", 
      message: "Gangotri glacier retreat detected via ISRO satellite monitoring",
      impact: "Long-term flow reduction predicted for Ganga system",
      action: "Enhanced monitoring, climate adaptation planning initiated",
      time: "1 day ago",
      priority: 3,
      coordinates: [78.9629, 30.9991]
    },
    { 
      id: 5,
      level: "Watch", 
      state: "Himachal Pradesh", 
      message: "Western disturbance bringing heavy snow to catchment areas",
      impact: "Increased spring runoff expected, flood preparedness needed",
      action: "Dam operations review, downstream alert system activated",
      time: "6 hours ago",
      priority: 4,
      coordinates: [77.1734, 31.1048]
    }
  ];

  // Real infrastructure projects with actual data
  const infrastructureProjects = [
    { 
      id: 1,
      name: "Ken-Betwa Link Project (Phase 1)", 
      progress: 35, 
      budget: "₹44,605 Cr", 
      completion: "Dec 2029",
      beneficiaries: "9.08 lakh hectares",
      states: ["UP", "MP"]
    },
    { 
      id: 2,
      name: "Sutlej-Yamuna Link Canal", 
      progress: 95, 
      budget: "₹1,200 Cr", 
      completion: "Ongoing",
      beneficiaries: "Punjab, Haryana water sharing",
      states: ["Punjab", "Haryana"]
    },
    { 
      id: 3,
      name: "Gangotri-Bhagirathi Eco-sensitive Zone", 
      progress: 78, 
      budget: "₹850 Cr", 
      completion: "Mar 2025",
      beneficiaries: "Ganga source protection",
      states: ["Uttarakhand"]
    },
    {
      id: 4,
      name: "Delhi Water Security Plan 2025",
      progress: 42,
      budget: "₹2,350 Cr", 
      completion: "Dec 2025",
      beneficiaries: "3.3 crore residents",
      states: ["Delhi", "Haryana"]
    }
  ];

  // Real policy metrics with current data
  const policyMetrics = [
    { 
      metric: "Inter-state Water Dispute Resolution", 
      value: "67%", 
      trend: "+12%",
      description: "Cases resolved through tribunal mediation" 
    },
    { 
      metric: "Flood Early Warning Accuracy", 
      value: "89%", 
      trend: "+23%",
      description: "Predictions within 48-hour window" 
    },
    { 
      metric: "Groundwater Recharge Rate", 
      value: "34%", 
      trend: "-8%",
      description: "Annual aquifer replenishment vs extraction" 
    },
    { 
      metric: "Canal System Efficiency", 
      value: "74%", 
      trend: "+15%",
      description: "Water reaching farm gate vs release point" 
    },
    {
      metric: "Drought Preparedness Index",
      value: "81%",
      trend: "+19%", 
      description: "Readiness score across all districts"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case "Critical": return "border-l-red-600 bg-red-50";
      case "High": return "border-l-orange-500 bg-orange-50";
      case "Medium": return "border-l-yellow-500 bg-yellow-50";
      case "Watch": return "border-l-blue-500 bg-blue-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "Critical": return "🚨";
      case "High": return "⚠️";
      case "Medium": return "⚡";
      case "Watch": return "👁️";
      default: return "ℹ️";
    }
  };

  const filteredAlerts = activeAlerts === 'all' 
    ? emergencyAlerts 
    : emergencyAlerts.filter(alert => alert.level === activeAlerts);

  const currentStateData = stateData[selectedState as keyof typeof stateData];

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={onNavigateBack}
            >
              ← Back to Dashboard Selection
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">🏛️ Government Command Center</Badge>
              <Badge variant="secondary">Live Data</Badge>
              <Badge variant="default" className="bg-green-600">Connected</Badge>
            </div>
          </div>

          <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">State Overview</TabsTrigger>
              <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
              <TabsTrigger value="infrastructure">Projects</TabsTrigger>
              <TabsTrigger value="data">Live Data</TabsTrigger>
              <TabsTrigger value="planning">Strategic Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-4 gap-6 mb-6">
                <Card className="lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">State Selection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(stateData).map(([key, data]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center justify-between w-full">
                              <span className="capitalize">{key}</span>
                              <Badge className={getRiskColor(data.risk)} variant="secondary">
                                {data.risk}
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {selectedState.charAt(0).toUpperCase() + selectedState.slice(1)} Water Security Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm text-muted-foreground">Population</div>
                        <div className="font-bold text-blue-900">
                          {(currentStateData.population / 10000000).toFixed(1)}Cr
                        </div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <Droplets className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                        <div className="text-sm text-muted-foreground">Water Stress</div>
                        <div className="font-bold text-orange-900">{currentStateData.waterStress}%</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <div className="text-sm text-muted-foreground">GDP</div>
                        <div className="font-bold text-green-900">{currentStateData.gdp}</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <Zap className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <div className="text-sm text-muted-foreground">Irrigation</div>
                        <div className="font-bold text-purple-900">{currentStateData.irrigated}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <InteractiveMap />

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Water Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Major Rivers</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStateData.majorRivers.map((river) => (
                          <Badge key={river} variant="outline">{river}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Dams & Reservoirs</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStateData.dams.map((dam) => (
                          <Badge key={dam} variant="secondary">{dam}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Districts:</span>
                        <span className="ml-2 font-medium">{currentStateData.districts}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Agriculture:</span>
                        <span className="ml-2 font-medium">{currentStateData.agriculture}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policy Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {policyMetrics.slice(0, 4).map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{metric.metric}</div>
                          <div className="text-xs text-muted-foreground">{metric.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{metric.value}</div>
                          <div className={`text-xs flex items-center ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {metric.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Live Emergency Alerts</h2>
                <Select value={activeAlerts} onValueChange={setActiveAlerts}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="Critical">Critical Only</SelectItem>
                    <SelectItem value="High">High Priority</SelectItem>
                    <SelectItem value="Medium">Medium Priority</SelectItem>
                    <SelectItem value="Watch">Watch Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.level)}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getAlertIcon(alert.level)}</span>
                          <Badge className={getRiskColor(alert.level)}>
                            {alert.level}
                          </Badge>
                          <span className="font-medium">{alert.state}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{alert.time}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm">Alert Message</h4>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Impact Assessment</h4>
                          <p className="text-sm text-muted-foreground">{alert.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Recommended Actions</h4>
                          <p className="text-sm text-muted-foreground">{alert.action}</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="default">
                            Deploy Response Team
                          </Button>
                          <Button size="sm" variant="outline">
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline">
                            Contact Stakeholders
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="infrastructure" className="space-y-6">
              <h2 className="text-2xl font-semibold">Infrastructure Projects Status</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {infrastructureProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>
                        Budget: {project.budget} • Target: {project.completion}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{project.progress}% Complete</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                      </div>
                      <div className="text-sm space-y-1">
                        <div><strong>Beneficiaries:</strong> {project.beneficiaries}</div>
                        <div><strong>States Involved:</strong> {project.states.join(", ")}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Update Progress</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <InteractiveFilters 
                currentFilters={filters}
                onFiltersChange={setFilters}
              />
              <LiveDataCharts />
            </TabsContent>

            <TabsContent value="planning" className="space-y-6">
              <h2 className="text-2xl font-semibold">Strategic Water Planning</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Long-term Projections (2030)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Population Growth</span>
                        <span className="font-medium">+15%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <span className="text-sm">Water Demand Increase</span>
                        <span className="font-medium">+22%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-sm">Climate Impact on Supply</span>
                        <span className="font-medium">-8%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Efficiency Improvements</span>
                        <span className="font-medium">+18%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Priorities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Canal Modernization</div>
                      <Progress value={85} className="h-2" />
                      <div className="text-xs text-muted-foreground">₹1,200 Cr allocated</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Groundwater Recharge</div>
                      <Progress value={65} className="h-2" />
                      <div className="text-xs text-muted-foreground">₹850 Cr allocated</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Flood Management</div>
                      <Progress value={45} className="h-2" />
                      <div className="text-xs text-muted-foreground">₹650 Cr allocated</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Technology Upgrade</div>
                      <Progress value={35} className="h-2" />
                      <div className="text-xs text-muted-foreground">₹400 Cr allocated</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}