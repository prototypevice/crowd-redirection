import { useState } from 'react';
import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header - Always visible unless fullscreen */}
      {!isFullscreen && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto text-center py-6 px-6">
            <h1 className="text-4xl font-bold mb-1 text-slate-900">Crowd Monitoring Dashboard</h1>
            <p className="text-slate-600 text-sm">Real-time crowd tracking for Baguio City</p>
          </div>
        </header>
      )}

      {/* Main Content - Constrained or Fullscreen */}
      <main className={`transition-all duration-300 ${isFullscreen ? 'min-h-screen p-0' : 'min-h-screen'}`}>
        <div className={`${isFullscreen ? 'w-full h-screen' : 'max-w-7xl mx-auto p-6'}`}>
          {/* Focus Mode Button - Fixed position when fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`${
              isFullscreen
                ? 'fixed top-6 right-6 z-50'
                : 'absolute top-0 right-0 mt-2 mr-2'
            } p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center`}
            title={isFullscreen ? 'Exit Focus Mode' : 'Enter Focus Mode'}
          >
            {isFullscreen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6v4m12 0h4v-4m0 12h-4v4m-12 0h4v-4"
                />
              </svg>
            )}
          </button>

          {/* Layout Grid: Sidebar and Map */}
          <div className={`flex gap-6 h-full ${isFullscreen ? 'min-h-screen' : ''}`}>
            {/* Sidebar - Hidden in fullscreen */}
            {!isFullscreen && (
              <aside className="w-72 flex-shrink-0">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg p-6 h-full text-white sticky top-6">
                  <h2 className="text-lg font-semibold mb-4">Analytics</h2>
                  {/* Sidebar content will be added here */}
                  <div className="text-slate-300 text-sm space-y-3">
                    <p>📊 Sidebar content coming soon...</p>
                    <p>Add your analytics and metrics here</p>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content Area with Map */}
            <div className={`flex-1 flex flex-col ${isFullscreen ? 'rounded-none' : 'rounded-xl overflow-hidden shadow-2xl border border-slate-200'}`}>
              {/* Map Container */}
              <div className={`flex-1 ${isFullscreen ? 'h-screen' : 'h-[600px]'} overflow-hidden ${isFullscreen ? 'rounded-none' : 'rounded-xl'}`}>
                <MapComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
