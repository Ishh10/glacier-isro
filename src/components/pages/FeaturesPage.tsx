import { Features } from "../Features";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface FeaturesPageProps {
  onNavigateToFeature: (feature: string) => void;
}

export function FeaturesPage({ onNavigateToFeature }: FeaturesPageProps) {
  const detailedFeatures = [
    {
      id: "climate-data",
      icon: "🌦️",
      title: "Climate Data Integration",
      description: "Comprehensive integration of rainfall, temperature, and snow cover data from multiple sources to build accurate predictive models.",
      details: "Our system processes real-time meteorological data from weather stations, satellite imagery, and historical climate databases."
    },
    {
      id: "ai-models",
      icon: "📊", 
      title: "AI Models",
      description: "Advanced machine learning algorithms trained on historical data to provide precise seasonal river flow predictions with confidence intervals.",
      details: "We employ state-of-the-art neural networks and ensemble methods for accurate forecasting with uncertainty quantification."
    },
    {
      id: "water-security",
      icon: "💧",
      title: "Water Security",
      description: "Supporting farmers, hydropower operators, and government agencies with actionable insights for water resource management.",
      details: "Tailored dashboards and alerts help stakeholders make informed decisions about water allocation and risk management."
    },
    {
      id: "future-scope",
      icon: "🌍",
      title: "Future Scope", 
      description: "Scalable framework designed to expand coverage to glacier basins worldwide, supporting global climate adaptation efforts.",
      details: "Our modular architecture enables rapid deployment to new regions with minimal customization requirements."
    }
  ];

  return (
    <div className="pt-16">
      <Features onNavigateToFeature={onNavigateToFeature} />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl text-foreground">
              Explore Our Features in Detail
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Click on any feature below to learn more about our technical approach and implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {detailedFeatures.map((feature) => (
              <Card key={feature.id} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                <CardHeader className="text-center space-y-4">
                  <div className="text-4xl mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-center">
                    {feature.details}
                  </CardDescription>
                  <div className="text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => onNavigateToFeature(feature.id)}
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}