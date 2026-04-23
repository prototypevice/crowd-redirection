import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

const STUDY_SITES = [
  { name: 'Session Road', lat: 16.4145, lng: 120.5965 },
  { name: 'Burnham Park', lat: 16.4083, lng: 120.5885 },
  { name: 'SM City Baguio', lat: 16.4127, lng: 120.5962 },
];

const MapContent = ({ setIsLoaded }) => {
  const map = useMap();
  const boundsAppliedRef = useRef(false);

  useEffect(() => {
    if (!map || boundsAppliedRef.current) return;

    const bounds = new google.maps.LatLngBounds();
    STUDY_SITES.forEach((site) => {
      bounds.extend(new google.maps.LatLng(site.lat, site.lng));
    });

    map.fitBounds(bounds, 50);
    boundsAppliedRef.current = true;

    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, [map, setIsLoaded]);

  return null;
};

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isLoaded, setIsLoaded] = useState(false);

  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-red-100 flex items-center justify-center">
        <p className="text-red-600">API key missing</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative overflow-hidden rounded-3xl" style={{ backgroundColor: '#e5e7eb' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(229, 231, 235, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #d1d5db',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'mapSpin 1s linear infinite'
          }} />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#374151', fontWeight: 500 }}>Loading map...</p>
        </div>
      )}

      <style>{`
        @keyframes mapSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <APIProvider apiKey={apiKey}>
        <Map
          mapId="46295848ff76ec6add65c5fc"
          gestureHandling="auto"
          disableDefaultUI={true}
          zoomControl={true}
          tiltControl={true}
          rotateControl={true}
        >
          <MapContent setIsLoaded={setIsLoaded} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
