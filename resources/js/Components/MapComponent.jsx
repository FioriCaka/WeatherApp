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
    <div>
    <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '30em', width: '30em' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />

    </MapContainer>
    {position && (
        <div>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
