import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const MapView: React.FC = () => {
  // Centro del mapa (centrado en Guatemala)
  const centerPosition: LatLngExpression = [15.7835, -90.2308];
  
  return (
    <div className="map-view-container" style={{ 
      height: "90%", 
      width: "100%",
      borderRadius: "5px",
      overflow: "hidden" 
    }}>
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
      </MapContainer>
    </div>
  );
};