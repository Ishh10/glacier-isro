import { Button } from "../ui/button";
import { LiveDataCharts } from "../LiveDataCharts";

type Props = { onNavigateBack: () => void };

export function ResearchDashboardPage({ onNavigateBack }: Props) {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Research Dashboard</h1>
        <Button variant="outline" onClick={onNavigateBack}>← Back</Button>
      </div>

      {/* This shows your 6-tab charts */}
      <LiveDataCharts />
    </div>
  );
}
