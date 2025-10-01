import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { FeaturesPage } from "./components/pages/FeaturesPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { TeamPage } from "./components/pages/TeamPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ClimateDataPage } from "./components/pages/ClimateDataPage";
import { AIModelsPage } from "./components/pages/AIModelsPage";
import { WaterSecurityPage } from "./components/pages/WaterSecurityPage";
import { FutureScopePage } from "./components/pages/FutureScopePage";
import { DashboardSelectorPage } from "./components/pages/DashboardSelectorPage";
import { FarmerDashboardPage } from "./components/pages/FarmerDashboardPage";
import { GovernmentDashboardPage } from "./components/pages/GovernmentDashboardPage";
import { HydropowerDashboardPage } from "./components/pages/HydropowerDashboardPage";
import { ResearchDashboardPage } from "./components/pages/ResearchDashboardPage";
import { LiveDataCharts } from "./components/LiveDataCharts";
import CsvCharts from "./components/CsvCharts";


export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleNavigateToFeature = (featureId: string) => {
    setCurrentPage(featureId);
  };

  const handleNavigateBackToFeatures = () => {
    setCurrentPage("features");
  };

  const handleNavigateToSpecificDashboard = (dashboardType: string) => {
    setCurrentPage(`dashboard-${dashboardType}`);
  };

  const handleNavigateBackToDashboardSelector = () => {
    setCurrentPage("dashboard-selector");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigateToDashboard={() => setCurrentPage("dashboard-selector")}
            onNavigateToAbout={() => setCurrentPage("about")}
          />
        );
      case "about":
        return <AboutPage />;
      case "features":
        return <FeaturesPage onNavigateToFeature={handleNavigateToFeature} />;
      case "dashboard":
        return (
          <DashboardPage
            onNavigateToDashboardSelector={() =>
              setCurrentPage("dashboard-selector")
            }
          />
        );
      case "dashboard-selector":
        return (
          <DashboardSelectorPage
            onNavigateToSpecificDashboard={handleNavigateToSpecificDashboard}
            onNavigateBack={() => setCurrentPage("dashboard")}
          />
        );
      case "dashboard-farmer":
        return (
          <FarmerDashboardPage onNavigateBack={handleNavigateBackToDashboardSelector} />
        );
      case "dashboard-government":
        return (
          <GovernmentDashboardPage onNavigateBack={handleNavigateBackToDashboardSelector} />
        );
      case "dashboard-hydropower":
        return (
          <HydropowerDashboardPage onNavigateBack={handleNavigateBackToDashboardSelector} />
        );
      case "dashboard-research":
        return (
          <ResearchDashboardPage onNavigateBack={handleNavigateBackToDashboardSelector} />
        );
      case "team":
        return <TeamPage />;
      case "contact":
        return <ContactPage />;
      case "climate-data":
        return <ClimateDataPage onNavigateBack={handleNavigateBackToFeatures} />;
      case "ai-models":
        return <AIModelsPage onNavigateBack={handleNavigateBackToFeatures} />;
      case "water-security":
        return <WaterSecurityPage onNavigateBack={handleNavigateBackToFeatures} />;
      case "future-scope":
        return <FutureScopePage onNavigateBack={handleNavigateBackToFeatures} />;

      // ✅ fixed unique cases
      case "live-charts":
        return <LiveDataCharts />;
      case "csv-charts":
        return <CsvCharts />;

      default:
        return (
          <HomePage
            onNavigateToDashboard={() => setCurrentPage("dashboard-selector")}
            onNavigateToAbout={() => setCurrentPage("about")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}
