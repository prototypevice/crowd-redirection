import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, useMap, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

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
    }, 4500);
  }, [map, setIsLoaded]);

  return null;
};

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-red-100 flex items-center justify-center">
        <p className="text-red-600">API key missing</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(229, 231, 235, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeOutOverlay 0.6s ease-out forwards'
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
        @keyframes fadeOutOverlay {
          0% {
            opacity: 1;
            pointer-events: auto;
          }
          100% {
            opacity: 0;
            pointer-events: none;
          }
        }
        .custom-marker {
          width: 16px;
          height: 16px;
          background-color: #3b82f6;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .custom-marker:hover {
          transform: scale(1.2);
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
          
          {STUDY_SITES.map((site) => (
            <AdvancedMarker
              key={site.name}
              position={{ lat: site.lat, lng: site.lng }}
              onClick={() => setSelectedSite(site)}
              onMouseEnter={() => setSelectedSite(site)}
              onMouseLeave={() => setSelectedSite(null)}
            >
              <div className="custom-marker" />
            </AdvancedMarker>
          ))}

          {selectedSite && (
            <InfoWindow
              position={{ lat: selectedSite.lat, lng: selectedSite.lng }}
              onCloseClick={() => setSelectedSite(null)}
              pixelOffset={[0, -12]}
            >
              <div className="p-3 text-sm min-w-[120px] text-center">
                <h3 className="font-extrabold text-slate-800 mb-1">{selectedSite.name}</h3>
                <span className="inline-block px-3 py-1 mt-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200 shadow-sm">
                  ● Status: Active
                </span>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
