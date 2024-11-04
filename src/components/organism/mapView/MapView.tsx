import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLng, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import { useTracking } from '@/hooks/useTracking';
import { Tracking } from '@/interface';
import { TrackingCard } from '@/components/molecule';

// Componente para centrar el mapa en un punto
const CenterMapOnPoint = ({ position }: { position: LatLng }) => {
  const map = useMap();
  map.setView(position, 15);
  return null;
};

export const MapView: React.FC = () => {
  const [selectedTracking, setSelectedTracking] = useState<Tracking | null>(null);
  const centerPosition: LatLngExpression = [15.7835, -90.2308];
  
  const { data: trackingData } = useQuery({
    queryKey: ['api-LogTrip'],
    queryFn: () => useTracking().fetchTrip(),
    refetchInterval: 5000,
  });

  // Agrupar trackings por idLogTrip para las rutas
  const groupedTrackings = trackingData?.reduce((acc, tracking) => {
    const key = tracking.idLogTrip;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tracking);
    return acc;
  }, {} as Record<number, Tracking[]>) || {};

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={centerPosition}
        zoom={8}
        style={{ 
          height: "100%", 
          width: "100%",
          borderRadius: "25px"
        }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Dibujar las rutas para cada viaje */}
        {Object.values(groupedTrackings).map((trackings, index) => {
          const points: LatLngExpression[] = trackings.map(track => [
            track.latitude,
            track.longitude
          ]);
          
          return (
            <Polyline 
              key={index}
              positions={points}
              color={selectedTracking?.idLogTrip === trackings[0].idLogTrip ? "blue" : "gray"}
              weight={selectedTracking?.idLogTrip === trackings[0].idLogTrip ? 4 : 2}
              opacity={selectedTracking?.idLogTrip === trackings[0].idLogTrip ? 1 : 0.5}
            />
          );
        })}

        {/* Marcadores para todos los puntos */}
        {trackingData?.map((track, index) => (
          <Marker 
            key={track.idTracking}
            position={new LatLng(track.latitude, track.longitude)}
            opacity={selectedTracking?.idTracking === track.idTracking ? 1 : 0.6}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">Point {index + 1}</h3>
                <p className="mb-1"><span className="font-semibold">ID:</span> {track.idTracking}</p>
                <p className="mb-1">
                  <span className="font-semibold">Status:</span> 
                  <span className={track.status ? 'text-green-600' : 'text-red-600'}>
                    {track.status ? ' Active' : ' Inactive'}
                  </span>
                </p>
                <p className="mb-1"><span className="font-semibold">Trip ID:</span> {track.idLogTrip}</p>
                <p className="mb-1"><span className="font-semibold">Lat:</span> {track.latitude.toFixed(6)}</p>
                <p className="mb-1"><span className="font-semibold">Lng:</span> {track.longitude.toFixed(6)}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Centrar mapa en el punto seleccionado */}
        {selectedTracking && (
          <CenterMapOnPoint 
            position={new LatLng(selectedTracking.latitude, selectedTracking.longitude)} 
          />
        )}
      </MapContainer>
      
      {/* Card con la lista de trackings */}
      <div className="absolute top-4 right-4 z-[1000]">
        <TrackingCard 
          onSelectTracking={setSelectedTracking}
          selectedTracking={selectedTracking}
        />
      </div>
    </div>
  );
};