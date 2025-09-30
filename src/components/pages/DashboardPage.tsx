import { DashboardPreview } from "../DashboardPreview";

interface DashboardPageProps {
  onNavigateToDashboardSelector: () => void;
}

export function DashboardPage({ onNavigateToDashboardSelector }: DashboardPageProps) {
  return (
    <div className="pt-16">
      <DashboardPreview onNavigateToDashboardSelector={onNavigateToDashboardSelector} />
    </div>
  );
}