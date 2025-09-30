import { Hero } from "../Hero";

interface HomePageProps {
  onNavigateToDashboard: () => void;
  onNavigateToAbout: () => void;
}

export function HomePage({ onNavigateToDashboard, onNavigateToAbout }: HomePageProps) {
  return (
    <div>
      <Hero 
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToAbout={onNavigateToAbout}
      />
    </div>
  );
}