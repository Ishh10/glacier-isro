import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DatePicker } from "./ui/calendar";

interface FilterState {
  region: string;
  waterBody: string[];
  timeRange: string;
  flowRange: [number, number];
  includeWeather: boolean;
  alertLevel: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

const regions = [
  { id: 'all', name: 'All Regions', description: 'Complete North Indian coverage' },
  { id: 'uttarakhand', name: 'Uttarakhand', description: 'Himalayan source region' },
  { id: 'himachal', name: 'Himachal Pradesh', description: 'Mountain watersheds' },
  { id: 'punjab', name: 'Punjab', description: 'Primary agricultural zone' },
  { id: 'haryana', name: 'Haryana', description: 'Canal distribution area' },
  { id: 'delhi', name: 'Delhi NCR', description: 'Urban consumption center' },
  { id: 'up-west', name: 'Western UP', description: 'Ganga basin plains' }
];

const waterBodies = [
  { id: 'ganga', name: 'Ganga System', flow: 1200, tributaries: 'Alaknanda, Bhagirathi' },
  { id: 'yamuna', name: 'Yamuna System', flow: 180, tributaries: 'Tons, Chambal, Betwa' },
  { id: 'sutlej', name: 'Sutlej System', flow: 850, tributaries: 'Spiti, Baspa' },
  { id: 'beas', name: 'Beas System', flow: 420, tributaries: 'Parvati, Tirthan' },
  { id: 'ravi', name: 'Ravi System', flow: 280, tributaries: 'Chandra, Bhaga' },
  { id: 'chenab', name: 'Chenab System', flow: 650, tributaries: 'Chandra, Bhaga' },
  { id: 'indus', name: 'Indus System', flow: 920, tributaries: 'Shyok, Nubra' }
];

const alertLevels = [
  { id: 'all', name: 'All Alerts', color: 'bg-gray-100' },
  { id: 'normal', name: 'Normal', color: 'bg-green-100' },
  { id: 'watch', name: 'Watch', color: 'bg-yellow-100' },
  { id: 'warning', name: 'Warning', color: 'bg-orange-100' },
  { id: 'critical', name: 'Critical', color: 'bg-red-100' }
];

interface InteractiveFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export function InteractiveFilters({ onFiltersChange, currentFilters }: InteractiveFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleRegionChange = (region: string) => {
    onFiltersChange({ ...currentFilters, region });
  };

  const handleWaterBodyToggle = (waterBodyId: string, checked: boolean) => {
    const newWaterBodies = checked
      ? [...currentFilters.waterBody, waterBodyId]
      : currentFilters.waterBody.filter(id => id !== waterBodyId);
    
    onFiltersChange({ ...currentFilters, waterBody: newWaterBodies });
  };

  const handleFlowRangeChange = (range: [number, number]) => {
    onFiltersChange({ ...currentFilters, flowRange: range });
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      region: 'all',
      waterBody: ['ganga', 'yamuna', 'sutlej'],
      timeRange: '24h',
      flowRange: [0, 2000],
      includeWeather: true,
      alertLevel: 'all',
      dateRange: {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date()
      }
    };
    onFiltersChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (currentFilters.region !== 'all') count++;
    if (currentFilters.waterBody.length < waterBodies.length) count++;
    if (currentFilters.timeRange !== '24h') count++;
    if (currentFilters.flowRange[0] > 0 || currentFilters.flowRange[1] < 2000) count++;
    if (!currentFilters.includeWeather) count++;
    if (currentFilters.alertLevel !== 'all') count++;
    return count;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            🔍 Interactive Data Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              {isAdvancedOpen ? 'Simple' : 'Advanced'} View
            </Button>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Filters */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Geographic Region</Label>
            <Select value={currentFilters.region} onValueChange={handleRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    <div>
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs text-muted-foreground">{region.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Time Range</Label>
            <Select value={currentFilters.timeRange} onValueChange={(value) => 
              onFiltersChange({ ...currentFilters, timeRange: value })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alert Level</Label>
            <Select value={currentFilters.alertLevel} onValueChange={(value) => 
              onFiltersChange({ ...currentFilters, alertLevel: value })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alertLevels.map((level) => (
                  <SelectItem key={level.id} value={level.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                      {level.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Water Body Selection */}
        <div className="space-y-3">
          <Label>River Systems & Water Bodies</Label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {waterBodies.map((waterBody) => (
              <div key={waterBody.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={waterBody.id}
                  checked={currentFilters.waterBody.includes(waterBody.id)}
                  onCheckedChange={(checked) => 
                    handleWaterBodyToggle(waterBody.id, checked as boolean)
                  }
                />
                <div className="flex-1 min-w-0">
                  <Label htmlFor={waterBody.id} className="text-sm font-medium cursor-pointer">
                    {waterBody.name}
                  </Label>
                  <div className="text-xs text-muted-foreground mt-1">
                    Flow: {waterBody.flow} cusecs
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {waterBody.tributaries}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Range Slider */}
        <div className="space-y-3">
          <Label>Flow Rate Range (cusecs)</Label>
          <div className="px-3">
            <Slider
              value={currentFilters.flowRange}
              onValueChange={handleFlowRangeChange}
              max={2000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{currentFilters.flowRange[0]} cusecs</span>
              <span>{currentFilters.flowRange[1]} cusecs</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium">Advanced Options</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="weather"
                  checked={currentFilters.includeWeather}
                  onCheckedChange={(checked) => 
                    onFiltersChange({ ...currentFilters, includeWeather: checked })
                  }
                />
                <Label htmlFor="weather">Include Weather Data</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-threshold">Custom Flow Threshold</Label>
                <Input
                  id="custom-threshold"
                  type="number"
                  placeholder="Enter threshold (cusecs)"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Station Coverage</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="p-2 bg-green-50 rounded text-center">
                  <div className="font-medium">Active Stations</div>
                  <div className="text-green-700">47</div>
                </div>
                <div className="p-2 bg-blue-50 rounded text-center">
                  <div className="font-medium">Weather Stations</div>
                  <div className="text-blue-700">23</div>
                </div>
                <div className="p-2 bg-orange-50 rounded text-center">
                  <div className="font-medium">River Gauges</div>
                  <div className="text-orange-700">18</div>
                </div>
                <div className="p-2 bg-purple-50 rounded text-center">
                  <div className="font-medium">Reservoirs</div>
                  <div className="text-purple-700">12</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {getActiveFilterCount() > 0 && (
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-sm font-medium mb-2">Active Filters:</div>
            <div className="flex flex-wrap gap-2">
              {currentFilters.region !== 'all' && (
                <Badge variant="secondary">
                  Region: {regions.find(r => r.id === currentFilters.region)?.name}
                </Badge>
              )}
              {currentFilters.waterBody.length < waterBodies.length && (
                <Badge variant="secondary">
                  {currentFilters.waterBody.length} Water Bodies Selected
                </Badge>
              )}
              {currentFilters.timeRange !== '24h' && (
                <Badge variant="secondary">
                  Time: {currentFilters.timeRange}
                </Badge>
              )}
              {currentFilters.alertLevel !== 'all' && (
                <Badge variant="secondary">
                  Alerts: {alertLevels.find(l => l.id === currentFilters.alertLevel)?.name}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}