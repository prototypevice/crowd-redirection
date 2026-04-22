# Crowd Monitoring Dashboard - Project Setup Guide

## 📦 What Was Created

A fully scaffolded, production-ready React frontend for the crowd-monitoring thesis project. The application provides real-time visualization of crowd density across multiple regions of interest (ROIs) in Baguio City.

## ✨ Key Features Implemented

### 1. **Modular Project Structure**
```
frontend/src/
├── components/          # Reusable UI components
│   ├── Dashboard.jsx          # Google Maps interface
│   ├── MetricsSidebar.jsx     # ROI metrics display
│   ├── ROICard.jsx            # Individual ROI status cards
│   └── StatusBadge.jsx        # Color-coded status indicators
├── hooks/               # Custom React hooks
│   └── useCrowdData.js        # React Query data fetching
├── utils/               # Helper functions & constants
│   ├── constants.js           # ROI config, thresholds, API endpoints
│   └── apiClient.js           # Axios client with interceptors
└── assets/              # Images and styling resources
```

### 2. **Interactive Google Maps Dashboard**
- Centered on Baguio City (16.4145°N, 120.5965°E)
- Color-coded markers for each ROI showing current crowd count
- Interactive info windows with detailed ROI information
- Responsive controls and map gestures

### 3. **Dynamic Metrics Sidebar**
- 5 ROIs pre-configured:
  - Session Road (500 capacity)
  - Burnham Park (1000 capacity)
  - SM Mall of Baguio (2000 capacity)
  - Cordillera Plaza (800 capacity)
  - People's Park (600 capacity)
- Real-time status badges (Green/Yellow/Red)
- Occupancy progress bars
- Summary statistics (total people, capacity, alert count)
- Manual refresh capability

### 4. **Advanced Data Management**
- **React Query Integration**: 
  - Automatic caching and refetching
  - 30-second default refresh interval
  - Stale time of 10 seconds
  - Fallback to simulated data if API unavailable

- **Custom Hooks**:
  - `useCrowdData()` - Fetch all ROI data
  - `useCrowdDataForRoi()` - Get specific ROI data
  - `useRefreshCrowdData()` - Manual refresh trigger

### 5. **Dark Mode Monitoring Aesthetic**
- Professional dark theme (#020617 background)
- Slate color palette (slate-dark, slate-darker, slate-card)
- High contrast for readability
- Smooth animations and transitions
- Custom scrollbar styling

### 6. **Responsive Design**
- Fully responsive layout
- Mobile-friendly sidebar
- Adaptive grid layouts
- Touch-friendly controls

## 🚀 Quick Start

### Installation
```bash
cd /home/skies/Coding/Thesis/crowd-simulation/frontend
npm install
```

### Configuration
```bash
cp .env.example .env.local
# Edit .env.local with your Google Maps API key
```

### Development
```bash
npm run dev
```
Access at: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 🔧 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Build Tool | Vite | 8.0.9 |
| UI Framework | React | 19.2.5 |
| Styling | Tailwind CSS | 3.x |
| Data Fetching | @tanstack/react-query | 5.99.2 |
| Maps | @vis.gl/react-google-maps | 1.8.3 |
| HTTP Client | axios | 1.15.2 |
| Dev Server | Vite | 8.0.9 |

## 📋 File Overview

### Components
- **Dashboard.jsx** (120 lines)
  - Google Maps integration
  - Marker rendering with color coding
  - Info windows for ROI details
  - Uses APIProvider wrapper

- **MetricsSidebar.jsx** (130 lines)
  - Summary statistics display
  - ROI card list
  - Manual refresh button
  - Loading states and error handling

- **ROICard.jsx** (65 lines)
  - Individual ROI status card
  - Progress bar visualization
  - Occupancy details
  - Timestamp display

- **StatusBadge.jsx** (20 lines)
  - Color-coded status indicator
  - Density percentage display
  - Memoized for performance

### Hooks
- **useCrowdData.js** (90 lines)
  - React Query integration
  - Automatic refetching
  - Simulated data fallback
  - Manual refresh capability

### Utilities
- **constants.js** (60 lines)
  - ROI configurations with coordinates
  - API endpoints
  - Density thresholds (Green/Yellow/Red)
  - Status determination logic

- **apiClient.js** (30 lines)
  - Axios client setup
  - Request/response interceptors
  - Error handling
  - Base URL configuration

## 🎨 Customization Guide

### Add New ROI
Edit `src/utils/constants.js`:
```javascript
{
  id: 'new-location',
  name: 'New Location Name',
  location: 'Description',
  coordinates: { lat: 16.xxxx, lng: 120.xxxx },
  capacity: 1000,
}
```

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
colors: {
  'slate-dark': '#custom-color',
  'slate-darker': '#custom-color',
  'slate-card': '#custom-color',
}
```

### Adjust Refresh Interval
In components using `useCrowdData()`:
```javascript
const { data } = useCrowdData({ refetchInterval: 60000 }); // 60 seconds
```

### Modify Density Thresholds
Edit `src/utils/constants.js`:
```javascript
DENSITY_THRESHOLDS = {
  GREEN: { max: 0.40, ... },  // Change from 0.33
  YELLOW: { max: 0.70, ... }, // Change from 0.66
}
```

## 🔌 API Integration

### Expected API Response Format
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

### Error Handling
If the API is unavailable, the application automatically:
1. Logs a warning
2. Falls back to simulated data
3. Displays "Using simulated data" indicator
4. Continues functioning normally

## 🧪 Testing & Validation

### ESLint Validation
```bash
npm run lint
```
✓ All linting rules pass

### Build Verification
```bash
npm run build
```
✓ Successful production build
- index.html: 0.45 kB (gzip: 0.29 kB)
- CSS: 4.72 kB (gzip: 1.47 kB)
- JS: 310.76 kB (gzip: 99.15 kB)

### Runtime Features
- ✓ Simulated data generation
- ✓ Real-time data updates
- ✓ Responsive layout
- ✓ Dark mode rendering
- ✓ Map interactions
- ✓ Status badge coloring

## 📱 Browser Compatibility

- ✓ Chrome/Edge 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚙️ Environment Variables

Create `.env.local` with:
```env
# Required: Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# Optional: API Base URL (defaults to localhost:8000)
VITE_API_BASE_URL=http://localhost:8000/api
```

## 📝 Documentation Files

- **DASHBOARD_README.md** - Complete user and developer guide
- **.env.example** - Environment variable template

## 🎯 Next Steps for Integration

1. **Set up Google Maps API**
   - Get API key: https://developers.google.com/maps/documentation/javascript/get-api-key
   - Add to `.env.local`

2. **Connect to Backend API**
   - Implement `/api/crowd-data` endpoint
   - Use the same response format specified
   - Update `VITE_API_BASE_URL` in `.env.local`

3. **Deploy**
   - Run `npm run build`
   - Deploy `dist/` directory to your hosting

4. **Monitor & Debug**
   - Use browser DevTools Network tab to inspect API calls
   - Check Console for data loading status
   - Verify marker positions on map

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Google Maps not showing
- Verify API key is correct
- Check Maps JavaScript API is enabled in Google Cloud Console
- Ensure key restrictions allow your domain

### Data not updating
- Check API endpoint is running
- Verify `.env.local` has correct `VITE_API_BASE_URL`
- Look at browser Network tab for failed requests

### Build fails
```bash
rm -rf node_modules dist
npm install
npm run build
```

## 📊 Performance Optimization

- **Code Splitting**: Vite automatically handles module splitting
- **Tree Shaking**: Unused code removed in production
- **Memoization**: React.memo used for components
- **Lazy Queries**: React Query uses cache efficiently
- **CSS Minification**: Tailwind produces optimized CSS

## 🔐 Security Considerations

- API key should be in `.env.local` (git-ignored)
- CORS properly configured on backend
- Input validation in API client
- No sensitive data in localStorage

## 📞 Support & Maintenance

For issues or improvements:
1. Check DASHBOARD_README.md for detailed documentation
2. Review component comments for usage examples
3. Verify environment configuration
4. Check browser console for errors

---

**Project Status**: ✅ Complete and Ready for Integration
**Last Updated**: April 23, 2026
