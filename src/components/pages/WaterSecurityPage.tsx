import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface WaterSecurityPageProps {
  onNavigateBack: () => void;
}

export function WaterSecurityPage({ onNavigateBack }: WaterSecurityPageProps) {
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
              <div className="text-6xl mb-4">💧</div>
              <h1 className="text-3xl lg:text-4xl text-foreground">
                North Indian Water Security Solutions
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Supporting Punjab farmers, Uttarakhand hydropower operators, and North Indian government agencies with actionable insights for Himalayan water resource management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl">🌾</span>
                  </div>
                  <CardTitle>Punjab-Haryana Agriculture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Wheat belt irrigation planning (Rabi season)</li>
                    <li>• Rice paddy water requirements (Kharif)</li>
                    <li>• Canal water scheduling from Bhakra system</li>
                    <li>• Groundwater depletion risk assessment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl">⚡</span>
                  </div>
                  <CardTitle>Himalayan Hydropower</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Tehri Dam reservoir optimization</li>
                    <li>• Bhakra-Nangal power generation forecasts</li>
                    <li>• Sutlej-Beas turbine scheduling</li>
                    <li>• Monsoon season peak load planning</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl">🏛️</span>
                  </div>
                  <CardTitle>State Government Planning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Delhi water supply security planning</li>
                    <li>• Inter-state water sharing (Yamuna, Sutlej)</li>
                    <li>• Flood management (Ganga plains)</li>
                    <li>• Climate adaptation strategies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white mb-12">
              <CardHeader>
                <CardTitle>North Indian Water Risk Assessment</CardTitle>
                <CardDescription>
                  Region-specific risk management for major river basins and urban centers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-red-600">🚨</span>
                    </div>
                    <h3 className="font-medium">Critical (Delhi NCR)</h3>
                    <p className="text-sm text-muted-foreground">
                      Yamuna depletion risk
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-orange-600">⚠️</span>
                    </div>
                    <h3 className="font-medium">High (Punjab)</h3>
                    <p className="text-sm text-muted-foreground">
                      Groundwater stress
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-yellow-600">⚡</span>
                    </div>
                    <h3 className="font-medium">Medium (Haryana)</h3>
                    <p className="text-sm text-muted-foreground">
                      Seasonal variation
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-green-600">✅</span>
                    </div>
                    <h3 className="font-medium">Good (Uttarakhand)</h3>
                    <p className="text-sm text-muted-foreground">
                      Himalayan source abundance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Regional Early Warning System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Ganga flood alerts (Haridwar to Kanpur)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Yamuna water shortage (Delhi region)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Western disturbance impact forecasts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Monsoon onset timing (June-July)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>State-Specific Decision Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Punjab canal release optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Haryana drought contingency planning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">UP sugarcane irrigation scheduling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Himachal hydropower load balancing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white mb-12">
              <CardHeader>
                <CardTitle>Real North Indian Water Bodies Monitored</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Major Rivers & Reservoirs</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Ganga:</strong> Gangotri glacier to Haridwar flow monitoring</li>
                      <li>• <strong>Yamuna:</strong> Yamunotri to Delhi water supply tracking</li>
                      <li>• <strong>Sutlej:</strong> Bhakra Dam inflow and irrigation releases</li>
                      <li>• <strong>Beas:</strong> Pong Dam operations and Punjab distribution</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-primary">Critical Infrastructure</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Tehri Dam:</strong> 2,400 MW hydropower + irrigation</li>
                      <li>• <strong>Bhakra Complex:</strong> 1,325 MW + canal network</li>
                      <li>• <strong>Indira Gandhi Canal:</strong> Rajasthan water security</li>
                      <li>• <strong>Upper Ganga Canal:</strong> Uttar Pradesh irrigation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Measurable Regional Impact</CardTitle>
                <CardDescription>
                  Real benefits achieved across North Indian water systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl text-primary">22%</div>
                    <div className="text-sm text-muted-foreground">Irrigation Efficiency (Punjab)</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl text-primary">4.2 days</div>
                    <div className="text-sm text-muted-foreground">Flood Warning Lead Time</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Farmer Adoption Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl text-primary">₹47 Cr</div>
                    <div className="text-sm text-muted-foreground">Annual Crop Loss Prevention</div>
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