import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import himalayanLakeImage from 'figma:asset/c4b99413fc9dd591eabcfaa4e8282be6c90b352d.png';

interface HeroProps {
  onNavigateToDashboard?: () => void;
  onNavigateToAbout?: () => void;
}

// Real-time data simulation for North Indian rivers
const generateLiveData = () => ({
  ganga: {
    flow: 1200 + Math.sin(Date.now() / 100000) * 200 + Math.random() * 50,
    location: "Haridwar, Uttarakhand",
    status: "Optimal"
  },
  yamuna: {
    flow: 180 + Math.sin(Date.now() / 120000) * 30 + Math.random() * 20,
    location: "Delhi",
    status: "Critical"
  },
  sutlej: {
    flow: 850 + Math.sin(Date.now() / 90000) * 150 + Math.random() * 40,
    location: "Bhakra, Punjab",
    status: "Normal"
  }
});

export function Hero({ onNavigateToDashboard, onNavigateToAbout }: HeroProps) {
  const [liveData, setLiveData] = useState(generateLiveData());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(generateLiveData());
      setCurrentTime(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Optimal": return "bg-green-100 text-green-800";
      case "Normal": return "bg-blue-100 text-blue-800";
      case "Critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl lg:text-5xl tracking-tight text-foreground">
                  Tarang Bharat
                </h1>
                <Badge variant="default" className="bg-green-600 animate-pulse">
                  🔴 LIVE
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground max-w-lg">
                Advanced glacier river flow prediction for India's water security and sustainable 
                Himalayan resource management across North Indian states.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={onNavigateToDashboard}
              >
                🚀 Explore Live Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={onNavigateToAbout}
              >
                📖 Learn More
              </Button>
            </div>

            {/* Live Data Preview Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Live River Flow Data</h3>
                <span className="text-sm text-muted-foreground">
                  Updated: {currentTime.toLocaleTimeString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(liveData).map(([river, data]) => (
                  <Card key={river} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">
                            {river === 'ganga' ? '🕉️ Ganga' : river === 'yamuna' ? '🏛️ Yamuna' : '⚡ Sutlej'}
                          </div>
                          <div className="text-sm text-muted-foreground">{data.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{Math.round(data.flow)}</div>
                          <div className="text-xs text-muted-foreground">cusecs</div>
                        </div>
                        <Badge className={getStatusColor(data.status)} variant="secondary">
                          {data.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>IMD Weather Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>ISRO Satellite Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>AI-Powered Forecasting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Multi-State Coverage</span>
              </div>
            </div>

            {/* Regional Coverage Stats */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">400M+</div>
                    <div className="text-sm text-muted-foreground">People Served</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">57</div>
                    <div className="text-sm text-muted-foreground">Monitoring Stations</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">State Coverage</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Live Monitoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            <ImageWithFallback
              src={himalayanLakeImage}
              alt="Pristine Himalayan glacier lake with turquoise waters surrounded by snow-capped peaks and rocky terrain - showcasing India's vital mountain water resources"
              className="w-full max-w-none rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
            
            {/* Floating Info Card on Image */}
            <Card className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">🏔️ Himalayan Source Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time glacier melt and snow cover analysis
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">-2.3°C</div>
                    <div className="text-xs text-muted-foreground">Avg Temperature</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
    </section>
  );
}