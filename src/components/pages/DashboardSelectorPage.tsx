import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DashboardSelectorPageProps {
  onNavigateToSpecificDashboard: (dashboardType: string) => void;
  onNavigateBack: () => void;
}

export function DashboardSelectorPage({ onNavigateToSpecificDashboard, onNavigateBack }: DashboardSelectorPageProps) {
  const dashboardTypes = [
    {
      id: "farmer",
      title: "Farmer Dashboard",
      description: "Irrigation planning, crop water requirements, and seasonal farming guidance",
      icon: "🌾",
      features: ["Irrigation schedules", "Crop recommendations", "Water availability alerts", "Weather forecasts"],
      users: "Agricultural communities",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      id: "government",
      title: "Government Dashboard", 
      description: "Policy planning, resource allocation, and regional water management oversight",
      icon: "🏛️",
      features: ["Regional water status", "Infrastructure planning", "Emergency alerts", "Policy impact analysis"],
      users: "Government agencies",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      id: "hydropower",
      title: "Hydropower Dashboard",
      description: "Reservoir management, power generation forecasts, and operational optimization",
      icon: "⚡",
      features: ["Reservoir levels", "Power generation forecasts", "Turbine scheduling", "Maintenance planning"],
      users: "Power companies",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    },
    {
      id: "research",
      title: "Research Dashboard",
      description: "Advanced analytics, model performance, and scientific data visualization",
      icon: "📊",
      features: ["Model accuracy metrics", "Historical analysis", "Climate projections", "Data export tools"],
      users: "Research institutions",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  return (
    <div className="pt-16">
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={onNavigateBack}
              className="mb-8"
            >
              ← Back to Dashboard Overview
            </Button>
            
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl lg:text-4xl text-foreground">
                Choose Your Dashboard Experience
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore specialized dashboards designed for India's diverse stakeholder needs. Each dashboard provides tailored tools and insights for optimal water resource management decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {dashboardTypes.map((dashboard) => (
                <Card 
                  key={dashboard.id} 
                  className={`border-0 shadow-sm transition-all duration-300 cursor-pointer ${dashboard.color}`}
                  onClick={() => onNavigateToSpecificDashboard(dashboard.id)}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <span className="text-2xl">{dashboard.icon}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {dashboard.users}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {dashboard.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {dashboard.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigateToSpecificDashboard(dashboard.id);
                        }}
                      >
                        Explore {dashboard.title}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Card className="border-0 shadow-sm bg-white max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Need a Custom Dashboard?</CardTitle>
                  <CardDescription>
                    We can create specialized dashboards for specific use cases and organizational needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Contact Us for Custom Solutions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}