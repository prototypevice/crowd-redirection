import React, { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [mapCenter, setMapCenter] = useState({ lat: 16.4145, lng: 120.5965 });

  // Handle API key errors
  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center rounded-3xl">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg">⚠️ Error: Google Maps API Key Missing</p>
          <p className="text-red-500 text-sm mt-2">Please check your .env configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] overflow-hidden rounded-3xl" style={{ borderRadius: '24px' }}>
      <APIProvider apiKey={apiKey} onLoad={() => console.log('Maps API loaded')}>
        <Map
          defaultZoom={16}
          defaultCenter={mapCenter}
          mapId="46295848ff76ec6add65c5fc"
          gestureHandling="auto"
          disableDefaultUI={true}
          zoomControl={true}
          tiltControl={true}
          rotateControl={true}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
        />
      </APIProvider>
    </div>
  );
};

export default MapComponent;
