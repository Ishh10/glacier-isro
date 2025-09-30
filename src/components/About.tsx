export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl text-foreground">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tarang Bharat is dedicated to securing North India's water future through AI-powered glacier 
              river flow prediction. We focus on the vital Himalayan watersheds feeding the Ganga, Yamuna, 
              Sutlej, and Indus river systems that sustain Punjab, Haryana, Delhi, and Uttar Pradesh. Our 
              platform serves the 400 million people dependent on Himalayan water sources, providing critical 
              insights to Punjab farmers, Bhakra-Tehri hydropower operators, and state water departments. 
              By combining real-time data from IMD weather stations with ISRO satellite monitoring, we deliver 
              precise forecasts for sustainable water resource management across North India's agricultural 
              heartland.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary text-2xl">🏛️</span>
              </div>
              <h3 className="font-medium">State Government Support</h3>
              <p className="text-sm text-muted-foreground">
                Enabling Punjab, Haryana, Delhi & UP water departments with real-time Himalayan watershed data for policy decisions
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary text-2xl">⚡</span>
              </div>
              <h3 className="font-medium">Hydropower Operations</h3>
              <p className="text-sm text-muted-foreground">
                Supporting Bhakra-Nangal, Tehri Dam, and Sutlej-Beas projects with accurate inflow predictions for optimal power generation
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-primary text-2xl">🌾</span>
              </div>
              <h3 className="font-medium">Agricultural Resilience</h3>
              <p className="text-sm text-muted-foreground">
                Empowering Punjab wheat belt and Haryana farmers with irrigation planning based on Himalayan snow cover and monsoon patterns
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-slate-50 rounded-lg">
            <div className="text-center space-y-4 mb-8">
              <h3 className="text-2xl text-foreground">Real North Indian Impact</h3>
              <div className="w-16 h-1 bg-primary mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Geographic Coverage</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Uttarakhand:</strong> Gangotri-Yamunotri glacier monitoring for Ganga-Yamuna systems</li>
                  <li>• <strong>Himachal Pradesh:</strong> Sutlej-Beas-Ravi watershed tracking for Punjab irrigation</li>
                  <li>• <strong>Punjab:</strong> Canal distribution optimization from Bhakra-Sirhind systems</li>
                  <li>• <strong>Haryana:</strong> Yamuna basin management and groundwater supplementation</li>
                  <li>• <strong>Delhi NCR:</strong> Urban water security planning based on upstream predictions</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Stakeholder Benefits</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Central Water Commission:</strong> Inter-state water allocation planning</li>
                  <li>• <strong>BBMB (Bhakra Board):</strong> Reservoir operation and flood control</li>
                  <li>• <strong>NHPC & SJVNL:</strong> Hydropower generation scheduling</li>
                  <li>• <strong>Farmer Producer Organizations:</strong> Crop planning and irrigation scheduling</li>
                  <li>• <strong>IMD Regional Centers:</strong> Enhanced weather forecasting accuracy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-3xl text-primary">400M+</div>
                <div className="text-sm text-muted-foreground">People Served by Monitored Rivers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl text-primary">15,000+</div>
                <div className="text-sm text-muted-foreground">Farmers Using Our Platform</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl text-primary">25</div>
                <div className="text-sm text-muted-foreground">Hydropower Plants Monitored</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl text-primary">5</div>
                <div className="text-sm text-muted-foreground">State Governments Partnered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}