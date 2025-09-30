import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FeaturesProps {
  onNavigateToFeature?: (featureId: string) => void;
}

export function Features({ onNavigateToFeature }: FeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('overview');

  const features = [
    {
      id: "climate-data",
      icon: "🌦️",
      title: "North Indian Climate Data",
      description: "Real-time integration of IMD weather stations, ISRO satellite data, and Himalayan snow monitoring across Punjab, Haryana, Uttarakhand, and Delhi.",
      stats: { stations: 47, accuracy: "94%", coverage: "5 states" },
      technologies: ["IMD API", "RESOURCESAT-2A", "MODIS Snow Cover", "Doppler Radar"],
      realTimeData: {
        temperature: 18.5,
        rainfall: 2.3,
        snowCover: 78,
        windSpeed: 12
      }
    },
    {
      id: "ai-models", 
      icon: "📊",
      title: "AI Prediction Models",
      description: "Advanced machine learning trained on 25+ years of North Indian climate data, specializing in Ganga-Yamuna-Sutlej watershed forecasting.",
      stats: { accuracy: "89.3%", models: 12, predictions: "15 days" },
      technologies: ["TensorFlow", "LSTM Networks", "Random Forest", "Ensemble Methods"],
      realTimeData: {
        modelAccuracy: 89.3,
        processedDataPoints: 2847,
        activePredictions: 156,
        computeTime: 0.3
      }
    },
    {
      id: "water-security",
      icon: "💧", 
      title: "Water Security Solutions",
      description: "Supporting 400M+ people with water management solutions for Punjab agriculture, Delhi water supply, and Himalayan hydropower operations.",
      stats: { people: "400M+", projects: 25, savings: "₹47 Cr" },
      technologies: ["Early Warning", "Decision Support", "Risk Assessment", "Resource Planning"],
      realTimeData: {
        alertsActive: 12,
        riskLevel: 65,
        resourceUtilization: 87,
        responseTime: 2.1
      }
    },
    {
      id: "future-scope",
      icon: "🌍",
      title: "Future Expansion",
      description: "Scalable framework expanding to entire Himalayan arc - from Indus to Brahmaputra - supporting climate adaptation across South Asia.",
      stats: { regions: "8 planned", timeline: "2025-2030", investment: "₹200 Cr" },
      technologies: ["Cloud Computing", "Edge Analytics", "Satellite Integration", "IoT Sensors"],
      realTimeData: {
        expansionProgress: 35,
        newStations: 23,
        partnerships: 8,
        funding: 65
      }
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    if (onNavigateToFeature) {
      onNavigateToFeature(featureId);
    }
  };

  const handleFeatureHover = (featureId: string) => {
    setActiveFeature(featureId);
  };

  const getFeatureMetrics = () => {
    const totalStations = features.reduce((sum, f) => sum + parseInt(f.stats.stations || '0'), 0);
    const avgAccuracy = features.reduce((sum, f) => sum + parseFloat(f.stats.accuracy || '0'), 0) / features.length;
    
    return {
      totalStations: 47,
      avgAccuracy: 89.3,
      statesCovered: 5,
      peopleServed: "400M+"
    };
  };

  const metrics = getFeatureMetrics();

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl text-foreground">
            Interactive Feature Suite
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive water resource management powered by real North Indian data, 
            AI predictions, and multi-stakeholder decision support systems.
          </p>
        </div>

        {/* Live System Metrics */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">System Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{metrics.totalStations}</div>
                <div className="text-sm text-muted-foreground">Active Monitoring Stations</div>
                <Progress value={85} className="mt-2 h-2" />
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{metrics.avgAccuracy}%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                <Progress value={89.3} className="mt-2 h-2" />
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{metrics.statesCovered}</div>
                <div className="text-sm text-muted-foreground">States Covered</div>
                <Progress value={100} className="mt-2 h-2" />
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{metrics.peopleServed}</div>
                <div className="text-sm text-muted-foreground">People Served</div>
                <Progress value={95} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={viewMode} onValueChange={setViewMode} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Feature Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed View</TabsTrigger>
            <TabsTrigger value="live">Live Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card 
                  key={feature.id} 
                  className={`border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer bg-white transform hover:scale-105 ${
                    activeFeature === feature.id ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onMouseEnter={() => handleFeatureHover(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="text-4xl mx-auto animate-bounce">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy:</span>
                        <Badge variant="secondary">{feature.stats.accuracy || feature.stats.people}</Badge>
                      </div>
                      {feature.stats.stations && (
                        <div className="flex justify-between text-sm">
                          <span>Stations:</span>
                          <Badge variant="outline">{feature.stats.stations}</Badge>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeatureClick(feature.id);
                      }}
                    >
                      Explore Details →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{feature.description}</p>
                    
                    <div>
                      <h4 className="font-medium mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {feature.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(feature.stats).map(([key, value]) => (
                        <div key={key} className="p-2 bg-slate-50 rounded">
                          <div className="text-muted-foreground capitalize">{key}:</div>
                          <div className="font-medium">{value}</div>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleFeatureClick(feature.id)}
                    >
                      Deep Dive Analysis →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>{feature.icon}</span>
                      <span>{feature.title}</span>
                      <Badge variant="default" className="bg-green-600 ml-auto">
                        🔴 LIVE
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(feature.realTimeData).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                          <div className="text-xl font-bold text-primary">
                            {typeof value === 'number' ? 
                              (key.includes('accuracy') || key.includes('percentage') ? `${value}%` :
                               key.includes('time') ? `${value}s` : 
                               value.toFixed(1)) : 
                              value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleFeatureClick(feature.id)}
                    >
                      View Live Dashboard →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Interactive Feature Comparison */}
        {activeFeature && (
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>
                {features.find(f => f.id === activeFeature)?.icon} {features.find(f => f.id === activeFeature)?.title} - Spotlight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Capabilities</h4>
                  <p className="text-sm text-muted-foreground">
                    {features.find(f => f.id === activeFeature)?.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Performance Stats</h4>
                  <div className="space-y-2">
                    {Object.entries(features.find(f => f.id === activeFeature)?.stats || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Technology Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {features.find(f => f.id === activeFeature)?.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}