import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface WaterStation {
  id: string;
  name: string;
  type: 'dam' | 'river' | 'canal' | 'weather';
  coordinates: [number, number];
  status: 'optimal' | 'warning' | 'critical';
  data: {
    waterLevel?: number;
    flow?: number;
    capacity?: number;
    temperature?: number;
    rainfall?: number;
  };
}

const northIndianStations: WaterStation[] = [
  {
    id: 'bhakra',
    name: 'Bhakra Dam',
    type: 'dam',
    coordinates: [76.4374, 31.4086],
    status: 'optimal',
    data: { waterLevel: 85, capacity: 9340, flow: 850 }
  },
  {
    id: 'tehri',
    name: 'Tehri Dam',
    type: 'dam',
    coordinates: [78.4346, 30.3819],
    status: 'warning',
    data: { waterLevel: 72, capacity: 4000, flow: 420 }
  },
  {
    id: 'haridwar',
    name: 'Haridwar (Ganga)',
    type: 'river',
    coordinates: [78.1642, 29.9457],
    status: 'optimal',
    data: { flow: 1250, temperature: 18 }
  },
  {
    id: 'delhi-yamuna',
    name: 'Delhi Yamuna',
    type: 'river',
    coordinates: [77.2090, 28.6139],
    status: 'critical',
    data: { flow: 180, temperature: 22 }
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh Weather',
    type: 'weather',
    coordinates: [76.7794, 30.7333],
    status: 'optimal',
    data: { temperature: 19, rainfall: 0 }
  },
  {
    id: 'shimla',
    name: 'Shimla Weather',
    type: 'weather',
    coordinates: [77.1734, 31.1048],
    status: 'optimal',
    data: { temperature: 12, rainfall: 2 }
  },
  {
    id: 'sirhind-canal',
    name: 'Sirhind Canal',
    type: 'canal',
    coordinates: [76.3829, 30.6434],
    status: 'optimal',
    data: { flow: 320 }
  }
];

export function InteractiveMap() {
  const [selectedStation, setSelectedStation] = useState<WaterStation | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dam': return '🏗️';
      case 'river': return '🌊';
      case 'canal': return '🚰';
      case 'weather': return '🌦️';
      default: return '📍';
    }
  };

  const filteredStations = filter === 'all' 
    ? northIndianStations 
    : northIndianStations.filter(station => station.type === filter);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>North Indian Water Infrastructure</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'dam' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('dam')}
              >
                Dams
              </Button>
              <Button 
                variant={filter === 'river' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('river')}
              >
                Rivers
              </Button>
              <Button 
                variant={filter === 'weather' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('weather')}
              >
                Weather
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simplified map representation */}
          <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="text-xs text-muted-foreground mb-2">
                Interactive map showing real North Indian water infrastructure
              </div>
              
              {/* Himalayan region representation */}
              <div className="absolute top-4 left-4 right-4 h-20 bg-gradient-to-b from-white to-blue-100 rounded border-2 border-blue-200 flex items-center justify-center text-sm font-medium text-blue-800">
                🏔️ Himalayan Watersheds (Uttarakhand, Himachal)
              </div>
              
              {/* Plains region */}
              <div className="absolute bottom-4 left-4 right-4 h-32 bg-gradient-to-b from-green-100 to-yellow-100 rounded border-2 border-green-200 flex items-center justify-center text-sm font-medium text-green-800">
                🌾 Indo-Gangetic Plains (Punjab, Haryana, Delhi, UP)
              </div>
              
              {/* Station markers */}
              {filteredStations.map((station) => (
                <button
                  key={station.id}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs cursor-pointer hover:scale-110 transition-transform ${getStatusColor(station.status)}`}
                  style={{
                    left: `${((station.coordinates[0] - 75) / 5) * 100}%`,
                    top: `${(1 - (station.coordinates[1] - 28) / 5) * 100}%`
                  }}
                  onClick={() => setSelectedStation(station)}
                  title={station.name}
                >
                  {getTypeIcon(station.type)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Critical</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedStation ? 'Station Details' : 'Select a Station'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedStation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{selectedStation.name}</h3>
                <Badge className={getStatusColor(selectedStation.status)}>
                  {selectedStation.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Type:</span>
                  <span className="capitalize">{selectedStation.type}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Coordinates:</span>
                  <span>{selectedStation.coordinates[1].toFixed(4)}°N, {selectedStation.coordinates[0].toFixed(4)}°E</span>
                </div>
                
                {selectedStation.data.waterLevel && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Water Level:</span>
                    <span>{selectedStation.data.waterLevel}%</span>
                  </div>
                )}
                
                {selectedStation.data.flow && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Flow Rate:</span>
                    <span>{selectedStation.data.flow} cusecs</span>
                  </div>
                )}
                
                {selectedStation.data.capacity && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Capacity:</span>
                    <span>{selectedStation.data.capacity} MCM</span>
                  </div>
                )}
                
                {selectedStation.data.temperature && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Temperature:</span>
                    <span>{selectedStation.data.temperature}°C</span>
                  </div>
                )}
                
                {selectedStation.data.rainfall !== undefined && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Rainfall (24h):</span>
                    <span>{selectedStation.data.rainfall}mm</span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setSelectedStation(null)}
              >
                View All Stations
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Click on any station marker to view detailed information about North Indian water infrastructure.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}