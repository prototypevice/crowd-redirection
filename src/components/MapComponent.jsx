import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, useMap, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

const STUDY_SITES = [
  { id: 1, name: 'SM City Baguio', lat: 16.40890863, lng: 120.5993898, category: 'Core' },
  { id: 2, name: 'Burnham Park', lat: 16.41282669, lng: 120.5925909, category: 'Core' },
  { id: 3, name: 'Session Road', lat: 16.41240812, lng: 120.59762317, category: 'Core' },
  { id: 4, name: 'Baguio Cathedral', lat: 16.41284103, lng: 120.59851821, category: 'Gateway' },
  { id: 5, name: 'Wright Park', lat: 16.41581538, lng: 120.61725983, category: 'Recreational' },
  { id: 6, name: 'Public Market Area', lat: 16.41492654, lng: 120.59560095, category: 'Throughput' },
];

const getMarkerColor = (category) => {
  switch(category) {
    case 'Core': return 'bg-blue-600';
    case 'Gateway': return 'bg-purple-600';
    case 'Recreational': return 'bg-green-600';
    case 'Throughput': return 'bg-orange-600';
    default: return 'bg-blue-600';
  }
};

const MapContent = ({ setIsLoaded, selectedSite, activeRedirection }) => {
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

  useEffect(() => {
    if (!map) return;
    
    // Smoothly pan to the redirection target, or just the selected site
    if (activeRedirection && !activeRedirection.error) {
      const target = STUDY_SITES.find(s => s.name === activeRedirection.name);
      if (target) {
        map.panTo({ lat: target.lat, lng: target.lng });
      }
    } else if (selectedSite) {
      map.panTo({ lat: selectedSite.lat, lng: selectedSite.lng });
    }
  }, [map, selectedSite, activeRedirection]);

  return null;
};

const MapComponent = ({ onLocationSelect, activeRedirection, mockData }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [hoveredSite, setHoveredSite] = useState(null);

  if (!apiKey) {
    return (
      <div className="w-full h-[600px] bg-red-100 flex items-center justify-center">
        <p className="text-red-600">API key missing</p>
      </div>
    );
  }

  const targetRedirectionSite = activeRedirection && !activeRedirection.error 
    ? STUDY_SITES.find(s => s.name === activeRedirection.name) 
    : null;
    
  const activeSite = hoveredSite || targetRedirectionSite || selectedSite;

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
          <MapContent setIsLoaded={setIsLoaded} selectedSite={selectedSite} activeRedirection={activeRedirection} />
          
          {STUDY_SITES.map((site) => {
            const isRecommended = activeRedirection && !activeRedirection.error && site.name === activeRedirection.name;
            
            const markerClass = isRecommended 
              ? "w-6 h-6 bg-yellow-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(250,204,21,0.8)] cursor-pointer transition-transform duration-200 animate-pulse z-10"
              : `w-5 h-5 ${getMarkerColor(site.category)} rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform duration-200 hover:scale-125`;

            return (
              <AdvancedMarker
                key={site.id}
                position={{ lat: site.lat, lng: site.lng }}
                onClick={() => {
                  setSelectedSite(site);
                  if (onLocationSelect) onLocationSelect(site);
                }}
                onMouseEnter={() => setHoveredSite(site)}
                onMouseLeave={() => setHoveredSite(null)}
                zIndex={isRecommended ? 100 : undefined}
              >
                <div className={markerClass} />
              </AdvancedMarker>
            );
          })}

          {activeSite && (
            <InfoWindow
              position={{ lat: activeSite.lat, lng: activeSite.lng }}
              onCloseClick={() => {
                setSelectedSite(null);
                setHoveredSite(null);
                if (onLocationSelect) onLocationSelect(null);
              }}
              pixelOffset={[0, -32]}
              disableAutoPan={true}
            >
              <div className="p-4 text-sm min-w-[180px] text-center">
                <h3 className="font-extrabold text-slate-800 mb-2">{activeSite.name}</h3>
                
                {mockData && mockData[activeSite.name] && (
                  <div className="flex flex-col gap-1.5 mb-3">
                    <div className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded">
                      <span className="text-xs text-slate-500 font-semibold">Density:</span>
                      <span className="text-xs font-bold text-blue-600">{mockData[activeSite.name].densityScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded">
                      <span className="text-xs text-slate-500 font-semibold">Throughput:</span>
                      <span className="text-xs font-bold text-orange-600">{mockData[activeSite.name].throughputScore}/100</span>
                    </div>
                  </div>
                )}
                
                <div className="inline-flex px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full border border-emerald-200 shadow-sm items-center justify-center gap-1.5 mx-auto w-max">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  Status: Active
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
