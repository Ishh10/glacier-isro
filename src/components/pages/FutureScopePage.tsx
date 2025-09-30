import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface FutureScopePageProps {
  onNavigateBack: () => void;
}

export function FutureScopePage({ onNavigateBack }: FutureScopePageProps) {
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
              <div className="text-6xl mb-4">🌍</div>
              <h1 className="text-3xl lg:text-4xl text-foreground">
                Future Scope & Expansion
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scalable framework designed to expand coverage to glacier basins worldwide, supporting global climate adaptation efforts and sustainable water management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Global Expansion Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Himalayan river systems</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Alpine regions (Europe, North America)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Andean watersheds</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Arctic river basins</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Other glacier-fed systems globally</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Technology Roadmap</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Model Enhancement</span>
                      <span className="text-xs text-muted-foreground">2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Multi-basin Integration</span>
                      <span className="text-xs text-muted-foreground">2025-26</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Global Platform Launch</span>
                      <span className="text-xs text-muted-foreground">2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Real-time Satellite Integration</span>
                      <span className="text-xs text-muted-foreground">2027</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Climate Change Adaptation</span>
                      <span className="text-xs text-muted-foreground">2028</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white mb-12">
              <CardHeader>
                <CardTitle>Scalability Framework</CardTitle>
                <CardDescription>
                  Modular architecture enabling rapid deployment to new regions worldwide
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🧩</span>
                    </div>
                    <h3 className="font-medium">Modular Design</h3>
                    <p className="text-sm text-muted-foreground">
                      Plug-and-play components for different regions
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🔄</span>
                    </div>
                    <h3 className="font-medium">Auto-calibration</h3>
                    <p className="text-sm text-muted-foreground">
                      Self-adapting models for local conditions
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">☁️</span>
                    </div>
                    <h3 className="font-medium">Cloud Infrastructure</h3>
                    <p className="text-sm text-muted-foreground">
                      Scalable computing and storage resources
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-primary">🤝</span>
                    </div>
                    <h3 className="font-medium">API Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Easy integration with existing systems
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Research Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Climate change impact modeling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Extreme weather event prediction</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ecosystem service valuation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Socio-economic impact assessment</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Interdisciplinary collaboration platforms</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle>Partnership Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>International space agencies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>UN Climate Change initiatives</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Global water management organizations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Academic research institutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Technology companies and startups</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle>Vision 2030</CardTitle>
                <CardDescription>
                  Our long-term goals for global water security and climate resilience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="text-3xl text-primary">100+</div>
                    <div className="text-sm text-muted-foreground">River Basins Covered</div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="text-3xl text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Countries Served</div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="text-3xl text-primary">1B+</div>
                    <div className="text-sm text-muted-foreground">People Benefited</div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                  <h3 className="font-medium mb-4 text-center">Sustainable Development Goals Alignment</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <span className="text-primary">🎯</span>
                      <span>SDG 6: Clean Water and Sanitation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary">🎯</span>
                      <span>SDG 13: Climate Action</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary">🎯</span>
                      <span>SDG 15: Life on Land</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary">🎯</span>
                      <span>SDG 17: Partnerships for Goals</span>
                    </div>
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