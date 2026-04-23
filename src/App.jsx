import MapComponent from './components/MapComponent';
import './App.css';

function App() {
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
            <MapComponent />
          </div>
        </div>

        {/* Card 2 - Right Side (Analytics) - Fixed width, pushed to right */}
        <div className="w-80 h-[800px] bg-white rounded-3xl shadow-lg p-8 flex flex-col flex-shrink-0">
          {/* Sidebar Title */}
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-8">System Analytics</h2>

          {/* Sidebar Content */}
          <div className="text-slate-600 text-sm space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="font-semibold text-slate-700">📊 Analytics</p>
              <p className="text-slate-500 text-xs mt-1">Content coming soon</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="font-semibold text-slate-700">📍 Metrics</p>
              <p className="text-slate-500 text-xs mt-1">Real-time data</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
