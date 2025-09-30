import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium">G</span>
              </div>
              <span className="font-medium text-lg">Glacier Flow Project</span>
            </div>
            <p className="text-sm text-slate-300 max-w-xs">
              AI-driven insights for water security and climate resilience in glacier-fed river basins.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>

          <div className="space-y-4" id="contact">
            <h3 className="font-medium">Contact Information</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>📧 info@glacierflow.research</li>
              <li>🔗 LinkedIn: /company/glacier-flow</li>
              <li>🏛️ Indian Space Research Organisation</li>
              <li>📍 Bangalore, Karnataka, India</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Stay Updated</h3>
            <p className="text-sm text-slate-300">
              Subscribe to receive updates on our research and developments.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © 2025 Glacier Flow Project | Built for Climate Resilience
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Data Usage</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}