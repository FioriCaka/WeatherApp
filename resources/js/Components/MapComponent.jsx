import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  // This function will capture latitude and longitude on map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng); // Pass the selected lat/lon to the parent component
      },
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {position && (
        <div>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
