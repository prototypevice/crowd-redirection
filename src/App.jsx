import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="text-center py-8 px-6">
          <h1 className="text-5xl font-bold mb-2 text-slate-900">Crowd Monitoring Dashboard</h1>
          <p className="text-slate-600 text-lg">Real-time crowd tracking for Baguio City</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center py-12 px-6">
        {/* Map Card - Fixed width, centered, with proper rounded corners */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300" style={{ width: '600px' }}>
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
