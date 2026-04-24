import { useState } from 'react';
import MapComponent from './components/MapComponent';
import { calculateRedirection } from './utils/topsisSolver';
import './App.css';

const MOCK_DATA = {
  'SM City Baguio': { densityScore: 60, throughputScore: 72, distance: 0.8, environment: 'Indoor', isPaid: false, seatingCapacity: 'High', scenicValue: 40 },
  'Burnham Park': { densityScore: 75, throughputScore: 45, distance: 1.2, environment: 'Outdoor', isPaid: false, seatingCapacity: 'High', scenicValue: 90 },
  'Session Road': { densityScore: 90, throughputScore: 21, distance: 0.5, environment: 'Outdoor', isPaid: false, seatingCapacity: 'Low', scenicValue: 80 },
  'Baguio Cathedral': { densityScore: 40, throughputScore: 85, distance: 1.5, environment: 'Indoor', isPaid: false, seatingCapacity: 'Medium', scenicValue: 85 },
  'Wright Park': { densityScore: 25, throughputScore: 95, distance: 3.5, environment: 'Outdoor', isPaid: false, seatingCapacity: 'Medium', scenicValue: 95 },
  'Public Market Area': { densityScore: 85, throughputScore: 30, distance: 1.0, environment: 'Outdoor', isPaid: false, seatingCapacity: 'Low', scenicValue: 50 },
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // User Preferences State
  const [userPrefs, setUserPrefs] = useState({
    maxTravelTime: 15,
    environments: { Indoor: true, Outdoor: true },
    travelMode: 'On Foot',
    groupSize: 1,
    navigationGoal: 'Efficiency',
    includePaid: false,
  });
  
  // Redirection State
  const [activeRedirection, setActiveRedirection] = useState(null);
  const [results, setResults] = useState([]);
  const [viewState, setViewState] = useState('preferences');

  const handleRedirect = () => {
    if (!selectedLocation || !MOCK_DATA[selectedLocation.name]) return;
    
    const data = calculateRedirection(selectedLocation.name, MOCK_DATA, userPrefs);
    console.log(data);
    setResults(data);
    setActiveRedirection(data.length > 0 ? data[0] : null);
    setViewState('results');
  };

  // Reset redirection if user clicks a new marker
  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    setActiveRedirection(null);
    setResults([]);
    setViewState('preferences');
  };

  const updatePref = (key, value) => {
    setUserPrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleEnvironmentToggle = (env) => {
    setUserPrefs(prev => ({
      ...prev,
      environments: { ...prev.environments, [env]: !prev.environments[env] }
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-8 flex items-start px-16 overflow-x-hidden">

        {/* Card 1 - Left Side (Title & Map) */}
        <div className="flex flex-col flex-grow h-[800px] gap-4 transition-all duration-500 ease-in-out min-w-0">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Crowd Monitoring Dashboard</h1>
            
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-50 transition-colors animate-fade-in"
              >
                <span>Show Preferences</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex-grow bg-white rounded-3xl shadow-lg overflow-hidden relative">
            <MapComponent 
              onLocationSelect={handleLocationSelect} 
              activeRedirection={activeRedirection} 
              mockData={MOCK_DATA}
            />
          </div>
        </div>

        {/* Card 2 - Right Side (User Preferences Sidebar) */}
        <div className={`h-[800px] bg-white rounded-3xl shadow-lg flex flex-col flex-shrink-0 relative transition-all duration-500 ease-in-out overflow-visible ${isSidebarOpen ? 'w-80 ml-8 opacity-100' : 'w-0 ml-0 opacity-0'}`}>
          
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-1/2 -left-4 z-50 transform -translate-y-1/2 p-1.5 bg-white rounded-full shadow-md text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Close Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="w-80 h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center px-6 pt-6 mb-4 flex-shrink-0">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {viewState === 'preferences' ? 'User Preferences' : 'Recommendations'}
              </h2>
            </div>

            <div className="text-slate-600 text-sm flex-1 overflow-y-auto pl-6 pr-6 pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
              
              {viewState === 'preferences' ? (
                <div className="space-y-8 animate-fade-in">
                  {/* Travel Time Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <h3 className="font-semibold text-slate-700">Max Travel Time</h3>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{userPrefs.maxTravelTime} mins</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="20" 
                  step="1"
                  value={userPrefs.maxTravelTime}
                  onChange={(e) => updatePref('maxTravelTime', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>5m</span>
                  <span>20m</span>
                </div>
              </div>

              {/* Travel Mode Dropdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Travel Mode</h3>
                <div className="relative">
                  <select 
                    value={userPrefs.travelMode}
                    onChange={(e) => updatePref('travelMode', e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer font-medium"
                  >
                    <option value="On Foot">On Foot</option>
                    <option value="By Vehicle">By Vehicle</option>
                    <option value="Commuting">Commuting</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Navigation Goal Dropdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Navigation Goal</h3>
                <div className="relative">
                  <select 
                    value={userPrefs.navigationGoal}
                    onChange={(e) => updatePref('navigationGoal', e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm cursor-pointer font-medium"
                  >
                    <option value="Efficiency">Efficiency (Avoid Crowds)</option>
                    <option value="Leisure">Leisure (Scenic Routes)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Group Size Input */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Group Size</h3>
                <input 
                  type="number" 
                  min="1"
                  value={userPrefs.groupSize}
                  onChange={(e) => updatePref('groupSize', Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 text-slate-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm font-medium cursor-pointer"
                />
              </div>

              {/* Environment Checkboxes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Environment</h3>
                <div className="space-y-3">
                  {['Indoor', 'Outdoor'].map((env) => (
                    <label key={env} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={userPrefs.environments[env]}
                          onChange={() => handleEnvironmentToggle(env)}
                          className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{env} Spaces</span>
                    </label>
                  ))}
                  
                  {/* Include Paid Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer group mt-2 pt-2 border-t border-slate-100">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={userPrefs.includePaid}
                        onChange={(e) => updatePref('includePaid', e.target.checked)}
                        className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-colors cursor-pointer"
                      />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Include Paid</span>
                  </label>
                </div>
              </div>
              </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <button 
                    onClick={() => setViewState('preferences')}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer mb-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Preferences
                  </button>
                  
                  {results.length > 0 ? (
                    results.map((site, index) => {
                      const isRecommended = index === 0;
                      const densityText = site.densityScore < 50 ? 'Low Density' : site.densityScore < 80 ? 'Medium Density' : 'High Density';
                      
                      return (
                        <div 
                          key={site.name} 
                          onClick={() => setActiveRedirection(site)}
                          className={`p-4 border rounded-xl shadow-sm cursor-pointer transition-all hover:-translate-y-1 ${isRecommended ? 'border-green-300 bg-green-50' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className={`font-bold ${isRecommended ? 'text-green-800' : 'text-slate-800'}`}>{index + 1}. {site.name}</p>
                            {isRecommended && (
                              <span className="px-2 py-0.5 text-[10px] font-bold bg-green-200 text-green-800 rounded-md tracking-wider">
                                [ RECOMMENDED ]
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600 mt-2">
                             <span className={`px-2 py-1 rounded-md border ${isRecommended ? 'bg-white border-green-200' : 'bg-slate-50 border-slate-100'}`}>{site.travelTime} min</span>
                             <span className={`px-2 py-1 rounded-md border ${isRecommended ? 'bg-white border-green-200' : 'bg-slate-50 border-slate-100'}`}>{site.environment}</span>
                             <span className={`px-2 py-1 rounded-md border ${isRecommended ? 'bg-white border-green-200' : 'bg-slate-50 border-slate-100'}`}>{densityText}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-400 italic">Select a location and click Redirect to see alternatives.</p>
                  )}
                </div>
              )}
            </div>

            {/* Redirect Action Button */}
            {viewState === 'preferences' && (
              <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex-shrink-0">
                <button 
                  onClick={handleRedirect}
                  disabled={!selectedLocation}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer hover:cursor-pointer hover:brightness-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  Redirect Me Now
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
