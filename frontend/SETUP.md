# Quick Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install:
   - React 18
   - Vite (build tool)
   - Tailwind CSS
   - Plotly.js
   - Axios
   - And other dependencies

3. **Start the backend server** (in a separate terminal):
   ```bash
   cd ../backend
   python app.py
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Troubleshooting

### Port 3000 already in use?
- Change the port in `vite.config.js`:
  ```js
  server: {
    port: 3001, // or any other port
  }
  ```

### Backend not connecting?
- Make sure backend is running on port 5000
- Check CORS settings in `backend/app.py`
- Create `.env` file in frontend directory:
  ```env
  VITE_API_URL=http://localhost:5000
  ```

### Dependencies not installing?
- Try clearing npm cache:
  ```bash
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

### Build errors?
- Make sure you're using Node.js v16 or higher
- Try deleting `node_modules` and reinstalling

## Project Structure Overview

```
frontend/
├── src/
│   ├── components/
│   │   ├── charts/        # Chart components (Plotly.js)
│   │   ├── Dashboard.jsx  # Main dashboard layout
│   │   ├── Filters.jsx    # Filter dropdowns
│   │   ├── SearchBar.jsx  # Search input
│   │   └── GenerateButton.jsx  # Generate button
│   ├── App.jsx            # Main app with state
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind & custom styles
├── package.json           # Dependencies
├── vite.config.js         # Vite config
└── tailwind.config.js     # Tailwind config
```

## Features Overview

1. **Filters**: Dropdown filters for Borough, Year, Vehicle Type, Contributing Factor, and Injury Type
2. **Search**: Natural language search (e.g., "Brooklyn 2022 sedan crashes")
3. **Charts**: 
   - Bar Chart: Borough distribution and top contributing factors
   - Pie Chart: Vehicle type distribution
   - Line Chart: Time series of crashes, injuries, and fatalities
   - Heatmap: Borough vs Month crash distribution
   - Map: Geographic crash locations
4. **Stats Cards**: Total crashes, injuries, fatalities, and unique collisions

## Next Steps

1. Customize the design in `src/index.css` and `tailwind.config.js`
2. Add more chart types if needed
3. Deploy to Vercel, Netlify, or Render when ready

For more details, see `README.md`
