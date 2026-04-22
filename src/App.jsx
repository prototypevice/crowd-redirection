import MapComponent from './components/MapComponent';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header Section */}
      <div className="text-center py-12 px-6">
        <h1 className="text-5xl font-bold mb-2">Crowd Monitoring Dashboard</h1>
        <p className="text-slate-400 text-lg">Real-time crowd tracking for Baguio City</p>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {/* Simple Map Card */}
        <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
