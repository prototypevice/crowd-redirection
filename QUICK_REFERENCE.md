# Quick Reference Guide

## 🚀 Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component with React Query setup |
| `src/components/Dashboard.jsx` | Google Maps interface |
| `src/components/MetricsSidebar.jsx` | ROI metrics and status display |
| `src/hooks/useCrowdData.js` | Data fetching hook |
| `src/utils/constants.js` | ROI config and thresholds |
| `.env.local` | Environment variables (create from .env.example) |

## 🎨 Component Hierarchy

```
<App>
  └─ <QueryClientProvider>
     └─ <div className="flex">
        ├─ <Dashboard />           [Left side - 70%]
        └─ <MetricsSidebar />      [Right side - 30%]
           └─ <ROICard /> (x5)
              └─ <StatusBadge />
```

## 📊 Density Color System

| Density | Status | Color | Range |
|---------|--------|-------|-------|
| 0-33% | Safe | 🟢 Green | Low |
| 34-66% | Caution | 🟡 Yellow | Medium |
| 67-100% | High Alert | 🔴 Red | High |

## 🔄 Data Flow

```
Backend API
    ↓
useCrowdData() hook (React Query)
    ↓
Cache & Auto-refresh (30s)
    ↓
MetricsSidebar + Dashboard
    ↓
StatusBadge + ROICard rendering
```

## 🛠️ Common Tasks

### Add a new ROI
1. Edit `src/utils/constants.js`
2. Add entry to `ROI_CONFIG` array
3. Component automatically renders

### Change map center
Edit `src/components/Dashboard.jsx`:
```javascript
const BAGUIO_CENTER = { lat: 16.4145, lng: 120.5965 };
```

### Adjust refresh rate
```javascript
useCrowdData({ refetchInterval: 60000 }) // milliseconds
```

### Change colors
Edit `tailwind.config.js` theme colors

### Add custom API headers
Edit `src/utils/apiClient.js` interceptors

## 📦 Dependencies at a Glance

- **React 19** - UI components
- **Vite** - Build & dev server
- **Tailwind** - Styling
- **React Query** - Data fetching/caching
- **Google Maps** - Map visualization
- **Axios** - HTTP requests

## 🌐 Environment Setup

Create `.env.local`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_API_BASE_URL=http://localhost:8000/api
```

## 💾 Build Output

```
dist/
├── index.html           (~0.5 kB)
├── assets/
│   ├── index-xxx.css    (~5 kB)
│   └── index-xxx.js     (~311 kB gzipped: ~99 kB)
```

## 🔗 Important Links

- [Google Maps API Setup](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)

## 🎯 Folder Structure

```
frontend/
├── src/
│   ├── components/          # UI Components
│   ├── hooks/              # React Hooks
│   ├── utils/              # Helpers & Constants
│   ├── assets/             # Images/Styles
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/                 # Static files
├── dist/                   # Build output
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .eslintrc.cjs
├── .env.example
└── .gitignore
```

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with API key
- [ ] No lint errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Dev server starts (`npm run dev`)
- [ ] Dashboard renders without errors
- [ ] Map shows Baguio location
- [ ] Sidebar displays 5 ROIs
- [ ] Status badges show colors
- [ ] Refresh button works

## 🆘 Quick Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| Map not showing | Add Google Maps API key to `.env.local` |
| Data not loading | Check API URL in `.env.local` and backend status |
| Build fails | Run `npm install` then `npm run build` |
| Styles not applied | Restart dev server after `.env` changes |

---

**For detailed documentation**, see `DASHBOARD_README.md` and `PROJECT_SETUP.md`
