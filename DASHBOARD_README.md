# Crowd Monitoring Dashboard - Frontend

A modern React frontend for real-time crowd monitoring and density visualization built with Vite, React, Tailwind CSS, and Google Maps.

## 🚀 Features

- **Real-time Crowd Monitoring**: Live density tracking for multiple Regions of Interest (ROIs)
- **Interactive Google Maps**: Visualize all ROIs on an interactive map centered at Baguio City
- **Responsive Sidebar**: Dynamic metrics display with status indicators (Green/Yellow/Red)
- **Dark Mode Aesthetic**: Professional monitoring dashboard with dark theme
- **Automatic Data Fetching**: React Query integration for efficient data management and caching
- **Simulated Data Support**: Works with placeholder API or includes simulated data for development

## 📋 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Interactive Google Maps component
│   │   ├── MetricsSidebar.jsx     # ROI metrics and status display
│   │   ├── ROICard.jsx            # Individual ROI card component
│   │   └── StatusBadge.jsx        # Status indicator component
│   ├── hooks/
│   │   └── useCrowdData.js        # React Query hook for data fetching
│   ├── utils/
│   │   ├── constants.js           # ROI configuration and thresholds
│   │   └── apiClient.js           # Axios client with interceptors
│   ├── assets/                    # Images and map styles
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── index.css                  # Global styles and Tailwind
│   └── main.jsx                   # React entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example                   # Environment variables template
```

## 🛠️ Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Environment Variables**

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Google Maps API key:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📦 Dependencies

- **React 19.2.5** - UI library
- **Vite 8.0.9** - Build tool and dev server
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **@tanstack/react-query 5.99.2** - Data fetching and caching
- **@vis.gl/react-google-maps 1.8.3** - Google Maps integration
- **axios 1.15.2** - HTTP client

## 🚀 Getting Started

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🗺️ ROI Configuration

The dashboard tracks 5 key locations in Baguio City:

1. **Session Road** - Downtown Baguio (500 capacity)
2. **Burnham Park** - Central Park (1000 capacity)
3. **SM Mall of Baguio** - Upper Session Road (2000 capacity)
4. **Cordillera Plaza** - Commercial District (800 capacity)
5. **People's Park** - Entertainment District (600 capacity)

Edit `src/utils/constants.js` to modify ROI configurations.

## 📊 Density Thresholds

Status indicators are determined by crowd density:

- **Green** (✓ Safe): 0-33% density
- **Yellow** (⚠ Caution): 34-66% density
- **Red** (⛔ High Alert): 67-100% density

## 🔌 API Integration

### Data Structure

The API should return data in the following format:

```json
{
  "timestamp": "2024-04-23T12:00:00Z",
  "roi_data": [
    {
      "roi_id": "session-road",
      "current_count": 250,
      "capacity": 500,
      "density": 0.5,
      "last_updated": "2024-04-23T12:00:00Z"
    }
  ]
}
```

### API Endpoints

- `GET /api/crowd-data` - Fetch current crowd data for all ROIs
- `GET /api/roi-status` - Get status for specific ROI
- `GET /api/metrics/real-time` - Real-time metrics

### Custom Hook: `useCrowdData`

```javascript
import { useCrowdData } from './hooks/useCrowdData';

function MyComponent() {
  const { data, isLoading, error, refetch } = useCrowdData({
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: true,
  });

  return (
    // Component JSX
  );
}
```

## 🎨 Customization

### Tailwind Configuration

Customize colors and theme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'slate-dark': '#0f172a',
      'slate-darker': '#020617',
      'slate-card': '#1e293b',
    },
  },
}
```

### Map Configuration

Edit map settings in `src/components/Dashboard.jsx`:

```javascript
<Map
  defaultCenter={{ lat: 16.4145, lng: 120.5965 }}
  defaultZoom={14}
  // Additional options...
/>
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📱 Responsive Design

The dashboard is fully responsive:

- **Desktop**: Full sidebar + Map layout
- **Tablet**: Adjusted proportions
- **Mobile**: Stacked sidebar and map (CSS adjustments in MetricsSidebar)

## 🧪 Development Mode

The application includes simulated data fallback. If the API is unavailable, it will automatically use generated crowd data for testing.

## 🐛 Troubleshooting

### Google Maps not loading

- Verify your API key is correct in `.env.local`
- Ensure the Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for errors

### Data not updating

- Check that the API endpoint is correct in `.env.local`
- Verify the backend is running and accessible
- Check the Network tab in browser DevTools

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 16 or higher)

## 📝 Contributing

For contributions, please follow these guidelines:

1. Create a new branch for your feature
2. Make changes following the existing code style
3. Test thoroughly before submitting
4. Update documentation as needed

## 📄 License

This project is part of a thesis project on crowd monitoring and analysis.

## 📧 Support

For issues and questions, contact the project maintainer.
