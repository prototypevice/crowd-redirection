import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [error, setError] = useState(null);

  // Baguio City center coordinates
  const baguioCenter = { lat: 16.4145, lng: 120.5965 };

  // Handle API key errors
  if (!apiKey) {
    return (
      <div className="w-full h-[500px] bg-slate-700 rounded-lg flex items-center justify-center">
        <p className="text-red-400">Error: Google Maps API key not found</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-slate-700 rounded-lg overflow-hidden">
      <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API loaded')}>
        <Map
          zoom={14}
          center={baguioCenter}
          mapId="crowd-monitoring-map"
          defaultCenter={baguioCenter}
          gestureHandling="greedy"
          fullscreenControl={true}
          zoomControl={true}
          mapTypeControl={true}
          streetViewControl={false}
        >
          {/* Marker for Baguio City Center */}
          <AdvancedMarker position={baguioCenter} title="Baguio City Center">
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
