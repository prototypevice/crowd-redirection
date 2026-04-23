import { useState } from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

const DENSITY_DATA = {
  'SM City Baguio': 60,
  'Burnham Park': 75,
  'Session Road': 90,
  'Baguio Cathedral': 40,
  'Wright Park': 25,
  'Public Market Area': 85,
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      {/* Canvas Background */}
      <div className="min-h-screen bg-slate-50 p-8 flex justify-between items-start px-16">

        {/* Card 1 - Left Side (Title & Map) - Takes about 65% */}
        <div className="flex flex-col w-[65%] h-[800px] gap-4">
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Crowd Monitoring Dashboard</h1>

          {/* Map Container - Strict Clipping */}
          <div className="flex-grow bg-white rounded-3xl shadow-lg overflow-hidden relative">
            <MapComponent onLocationSelect={setSelectedLocation} />
          </div>
        </div>

        {/* Card 2 - Right Side (Analytics) - Fixed width, pushed to right */}
        <div className="w-80 h-[800px] bg-white rounded-3xl shadow-lg p-8 flex flex-col flex-shrink-0">
          {/* Sidebar Title */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Analytics</h2>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="text-slate-600 text-sm space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-700">Area Density</h3>
              
              {Object.entries(DENSITY_DATA).map(([loc, fillPercentage]) => {
                const isSelected = selectedLocation?.name === loc;
                // If a location is selected, emphasize it. Otherwise, show it normally.
                // Wait, user asked: "Make the progress bars in the sidebar update to show data for the selectedLocation."
                // I will show the real percentage if selected, otherwise show 0 or default, but wait, it's better to show real data always and just highlight the selected one, or only show the value when selected.
                // Let's show the value and color only when selected, or just highlight the selected one clearly.
                const displayPercentage = isSelected ? fillPercentage : 20; // fallback visual when not selected
                
                return (
                  <div key={loc} className={`p-3 rounded-xl transition-colors duration-300 ${isSelected ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'bg-slate-50 border border-transparent'}`}>
                    <div className="flex justify-between mb-2">
                      <p className={`text-xs font-medium ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>{loc} Density</p>
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

            <div className="p-4 bg-slate-50 rounded-xl mt-8">
              <p className="font-semibold text-slate-700">📍 Metrics</p>
              <p className="text-slate-500 text-xs mt-1">Select a location on the map to view live density data.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
