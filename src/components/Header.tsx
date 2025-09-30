import { Button } from "./ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}



export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">🏔️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-lg text-foreground">
                Tarang Bharat
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Glacier Flow Prediction System
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-colors ${currentPage === 'home' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`transition-colors ${currentPage === 'about' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('features')}
              className={`transition-colors ${currentPage === 'features' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Features
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors ${currentPage === 'dashboard' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('team')}
              className={`transition-colors ${currentPage === 'team' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Team
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className={`transition-colors ${currentPage === 'contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              Contact
            </button>
          </nav>

          <Button variant="outline" className="md:hidden">
            Menu
          </Button>
          <button onClick={() => onNavigate('csv-charts')}>
  CSV Charts
</button>

        </div>
      </div>
    </header>
  );
}