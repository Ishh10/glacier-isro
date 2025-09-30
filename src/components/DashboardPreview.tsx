import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LiveDataCharts } from "./LiveDataCharts";
import { InteractiveMap } from "./InteractiveMap";

interface DashboardPreviewProps {
  onNavigateToDashboardSelector: () => void;
}

export function DashboardPreview({ onNavigateToDashboardSelector }: DashboardPreviewProps) {
  // Real-time preview data for North Indian rivers
  const livePreviewData = [
    { 
      river: "Ganga at Haridwar", 
      flow: 1240, 
      status: "Optimal", 
      trend: "+5%",
      state: "Uttarakhand"
    },
    { 
      river: "Yamuna at Delhi", 
      flow: 175, 
      status: "Critical", 
      trend: "-18%",
      state: "Delhi"
    },
    { 
      river: "Sutlej at Bhakra", 
      flow: 850, 
      status: "Normal", 
      trend: "+2%",
      state: "Punjab"
    },
    { 
      river: "Beas at Pong", 
      flow: 420, 
      status: "Normal", 
      trend: "-3%",
      state: "Himachal Pradesh"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimal": return "bg-green-100 text-green-800";
      case "Normal": return "bg-blue-100 text-blue-800"; 
      case "Warning": return "bg-yellow-100 text-yellow-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl text-foreground">
              Interactive North Indian Water Dashboard
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live monitoring and predictive analytics for Himalayan river systems, serving 
              Punjab, Haryana, Delhi, and Uttarakhand with real-time water security intelligence.
            </p>
          </div>

          {/* Live Data Preview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Live River Flow Data</h3>
              <Badge variant="default" className="bg-green-600">🔴 LIVE</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {livePreviewData.map((data, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{data.river}</CardTitle>
                    <CardDescription className="text-xs">{data.state}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{data.flow}</span>
                        <Badge className={getStatusColor(data.status)} variant="secondary">
                          {data.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        cusecs • {data.trend} vs last week
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive Map Component */}
          <div className="mb-12">
            <InteractiveMap />
          </div>

          {/* Live Charts Preview */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Flow Monitoring</CardTitle>
                <CardDescription>
                  Live data feeds from IMD weather stations and Central Water Commission river gauges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LiveDataCharts />
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🌊</span>
                </div>
                <CardTitle>Live River Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-time flow data from Ganga, Yamuna, Sutlej, and Beas river systems with 5-minute update intervals
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Stations:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Update Frequency:</span>
                    <span className="font-medium">5 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">📊</span>
                </div>
                <CardTitle>Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered forecasting models trained on 20+ years of North Indian climate and hydrological data
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Rate:</span>
                    <span className="font-medium">89.3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Forecast Range:</span>
                    <span className="font-medium">15 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <CardTitle>Smart Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Automated early warning system for floods, droughts, and water shortage scenarios across all states
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Time:</span>
                    <span className="font-medium">2.1 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Alert Types:</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Coverage */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>North Indian Coverage</CardTitle>
              <CardDescription>
                Comprehensive monitoring across major watershed regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏔️</span>
                  </div>
                  <h4 className="font-medium">Himalayan Source</h4>
                  <p className="text-sm text-muted-foreground">Uttarakhand, Himachal Pradesh glacier monitoring</p>
                  <Badge variant="outline">15 stations</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <h4 className="font-medium">Agricultural Plains</h4>
                  <p className="text-sm text-muted-foreground">Punjab, Haryana irrigation systems</p>
                  <Badge variant="outline">22 stations</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏙️</span>
                  </div>
                  <h4 className="font-medium">Urban Centers</h4>
                  <p className="text-sm text-muted-foreground">Delhi NCR water supply monitoring</p>
                  <Badge variant="outline">8 stations</Badge>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-medium">Hydropower</h4>
                  <p className="text-sm text-muted-foreground">Dam and reservoir operations</p>
                  <Badge variant="outline">12 facilities</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Explore Interactive Dashboards
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access role-specific dashboards for farmers, government officials, hydropower operators, 
              and researchers with real-time North Indian water data and predictive insights.
            </p>
            <Button 
              size="lg" 
              onClick={onNavigateToDashboardSelector}
              className="bg-primary hover:bg-primary/90"
            >
              Launch Interactive Dashboard →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}