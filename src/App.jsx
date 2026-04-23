import { useState } from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

const MOCK_DATA = {
  'SM City Baguio': { density: 60, score: 0.72 },
  'Burnham Park': { density: 75, score: 0.45 },
  'Session Road': { density: 90, score: 0.21 },
  'Baguio Cathedral': { density: 40, score: 0.85 },
  'Wright Park': { density: 25, score: 0.95 },
  'Public Market Area': { density: 85, score: 0.30 },
};

const calculateRedirection = (currentLocationName) => {
  if (!currentLocationName || !MOCK_DATA[currentLocationName]) return null;
  
  const alternatives = Object.entries(MOCK_DATA)
    .filter(([name]) => name !== currentLocationName)
    .map(([name, data]) => ({ name, ...data }));
    
  if (alternatives.length === 0) return null;

  const bestAlternative = alternatives.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  const efficiencyDiff = Math.round((bestAlternative.score - MOCK_DATA[currentLocationName].score) * 100);
  
  return {
    ...bestAlternative,
    reason: `Due to ${efficiencyDiff}% higher throughput efficiency`
  };
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const recommendedLocation = selectedLocation ? calculateRedirection(selectedLocation.name) : null;

  return (
    <>
      {/* Canvas Background */}
      <div className="min-h-screen bg-slate-50 p-8 flex items-start px-16 overflow-x-hidden">

        {/* Card 1 - Left Side (Title & Map) */}
        <div className="flex flex-col flex-grow h-[800px] gap-4 transition-all duration-500 ease-in-out min-w-0">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Crowd Monitoring Dashboard</h1>
            
            {/* Open Sidebar Button */}
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-50 transition-colors animate-fade-in"
              >
                <span>Show Analytics</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Map Container - Strict Clipping */}
          <div className="flex-grow bg-white rounded-3xl shadow-lg overflow-hidden relative">
            <MapComponent 
              onLocationSelect={setSelectedLocation} 
              recommendedLocationName={recommendedLocation?.name} 
            />
          </div>
        </div>

        {/* Card 2 - Right Side (Analytics Sidebar) */}
        <div className={`h-[800px] bg-white rounded-3xl shadow-lg flex flex-col flex-shrink-0 relative transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-80 ml-8 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
          
          {/* Close Button - Floating Anchor on the left edge */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 bg-white rounded-full shadow-md text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors z-50"
            title="Close Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Fixed Width Inner Wrapper - Prevents text squishing during width animation */}
          <div className="w-80 h-full p-6 flex flex-col relative">

            {/* Sidebar Title */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Analytics</h2>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="text-slate-600 text-sm space-y-6 overflow-y-auto pr-2 pb-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Area Density</h3>
                
                {Object.entries(MOCK_DATA).map(([loc, data]) => {
                  const fillPercentage = data.density;
                  const isSelected = selectedLocation?.name === loc;
                  
                  return (
                    <div key={loc} className={`p-3 rounded-xl transition-colors duration-300 space-y-2 ${isSelected ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'bg-slate-50 border border-transparent'}`}>
                      <div className="flex justify-between">
                        <p className={`text-xs font-medium ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>{loc}</p>
                        <span className={`text-xs font-bold transition-opacity ${isSelected ? 'text-blue-700 opacity-100' : 'text-slate-400 opacity-0'}`}>{fillPercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${isSelected ? 'bg-blue-500' : 'bg-slate-300'}`}
                          style={{ width: `${isSelected ? fillPercentage : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedLocation && recommendedLocation ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mt-8 shadow-sm">
                  <p className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    Redirection Suggestion
                  </p>
                  <div className="text-yellow-900 text-xs space-y-2 leading-relaxed">
                    <p><span className="font-semibold text-yellow-700">Current Location:</span> {selectedLocation.name}</p>
                    <p><span className="font-semibold text-yellow-700">Redirection Recommended:</span> {recommendedLocation.name}</p>
                    <p className="text-yellow-600 italic mt-2 bg-yellow-100/50 p-2 rounded-lg inline-block">({recommendedLocation.reason})</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl mt-8">
                  <p className="font-semibold text-slate-700">📍 Metrics</p>
                  <p className="text-slate-500 text-xs mt-1">Select a location on the map to view live density data.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
