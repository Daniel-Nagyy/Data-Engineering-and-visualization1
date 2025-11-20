# NYC Crash Analysis Dashboard - Frontend

A modern, interactive React dashboard for visualizing NYC Motor Vehicle Collisions data with beautiful glassmorphism design, animated components, and real-time filtering.

## Features

- 🎨 **Modern UI Design**: Glassmorphism effects with gradient backgrounds
- 📊 **Interactive Charts**: Multiple chart types (Bar, Pie, Line, Heatmap, Map) using Plotly.js
- 🔍 **Search Mode**: Natural language search query parsing
- 🎯 **Advanced Filtering**: Multiple dropdown filters with real-time updates
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Optimized rendering and data processing
- 🎭 **Smooth Animations**: Fade-in, slide-up animations for better UX

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Plotly.js**: Interactive data visualization library
- **Axios**: HTTP client for API calls

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

1. Make sure your backend server is running on `http://localhost:5000`

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Building for Production

1. Build the production bundle:
```bash
npm run build
```

2. The built files will be in the `dist` directory

3. Preview the production build:
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── BarChart.jsx      # Borough and contributing factors bar charts
│   │   │   ├── PieChart.jsx      # Vehicle type distribution pie chart
│   │   │   ├── LineChart.jsx     # Time series line chart
│   │   │   ├── Heatmap.jsx       # Borough vs month heatmap
│   │   │   └── MapChart.jsx      # Geographic crash locations map
│   │   ├── Dashboard.jsx         # Main dashboard layout with stat cards
│   │   ├── Filters.jsx           # Dropdown filter components
│   │   ├── SearchBar.jsx         # Search input with clear button
│   │   └── GenerateButton.jsx    # Animated generate report button
│   ├── App.jsx                   # Main app component with state management
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind CSS and custom styles
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

## Usage

1. **Select Filters**: Use the dropdown filters to narrow down the data by:
   - Borough
   - Year
   - Vehicle Type
   - Contributing Factor
   - Injury Type

2. **Search Mode**: Type natural language queries like:
   - "Brooklyn 2022 sedan crashes"
   - "Queens injuries"
   - "Manhattan fatalities"

3. **Generate Report**: Click the "Generate Report" button to visualize the filtered data

4. **Explore Charts**: Interact with the charts:
   - Hover for details
   - Zoom and pan on charts
   - Click legend items to toggle series

## Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Render

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of a Data Engineering and Visualization course project.

## Contributing

This is a course project. Contributions should follow the project requirements and be approved by the team.
