import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useTracking } from '@/hooks/useTracking';
import { MapPin, Navigation, Activity, Clock } from 'lucide-react';
import { Tracking } from '@/interface';

interface TrackingListCardProps {
  onSelectTracking: (tracking: Tracking) => void;
  selectedTracking: Tracking | null;
}

export const TrackingCard: React.FC<TrackingListCardProps> = ({ 
  onSelectTracking,
  selectedTracking 
}) => {
  const { data: trackingData } = useTracking();

  if (!trackingData?.length) {
    return (
      <Card className="w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-xl">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="rounded-full bg-gray-100 w-12 h-12 mx-auto flex items-center justify-center">
              <Activity className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-gray-500 font-medium">No tracking data available</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-blue-100 p-1.5">
              <Navigation className="w-4 h-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Tracking Routes
            </CardTitle>
          </div>
          <Badge 
            variant="secondary" 
            className="px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200"
          >
            {trackingData.length} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[450px]">
          <div className="space-y-2">
            {trackingData.map((track) => (
              <div 
                key={track.idTracking}
                className={`group p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedTracking?.idTracking === track.idTracking 
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200' 
                    : 'bg-white hover:bg-gray-50/50 border-gray-200'
                }`}
                onClick={() => onSelectTracking(track)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                      selectedTracking?.idTracking === track.idTracking
                        ? 'bg-blue-200 text-blue-700'
                        : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center text-sm">
                        <span className="font-semibold text-gray-800">Trip #{track.idLogTrip}</span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <span className="text-gray-500">Point #{track.idTracking}</span>
                      </div>
                      <Badge 
                        variant={track.status ? "default" : "secondary"}
                        className={`text-xs font-medium transition-colors duration-200 ${
                          track.status 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {track.status ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs font-mono bg-gradient-to-r from-gray-50 to-gray-100 px-2 py-1 rounded-md border border-gray-200">
                        {track.latitude.toFixed(4)}°N, {track.longitude.toFixed(4)}°E
                      </div>
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">Now</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
