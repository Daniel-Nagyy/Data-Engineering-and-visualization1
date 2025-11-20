import React, { useMemo } from 'react'
import Plot from 'react-plotly.js'

function MapChart({ data }) {
  const mapData = useMemo(() => {
    if (!data || data.length === 0) return { lat: [], lon: [], sizes: [], text: [] }

    const validData = data
      .filter(item => {
        const lat = typeof item.latitude === 'string' ? parseFloat(item.latitude) : Number(item.latitude)
        const lon = typeof item.longitude === 'string' ? parseFloat(item.longitude) : Number(item.longitude)
        return !isNaN(lat) && !isNaN(lon) && 
               lat >= 40.5 && lat <= 40.9 && 
               lon >= -74.3 && lon <= -73.7
      })
      .slice(0, 5000) // Limit to 5000 points for performance

    const lat = validData.map(item => {
      return typeof item.latitude === 'string' ? parseFloat(item.latitude) : Number(item.latitude)
    })
    const lon = validData.map(item => {
      return typeof item.longitude === 'string' ? parseFloat(item.longitude) : Number(item.longitude)
    })
    
    // Size based on severity (injuries + fatalities)
    const sizes = validData.map(item => {
      const injuredVal = item.number_of_persons_injured
      const killedVal = item.number_of_persons_killed
      const injured = typeof injuredVal === 'string' ? parseFloat(injuredVal) : (Number(injuredVal) || 0)
      const killed = typeof killedVal === 'string' ? parseFloat(killedVal) : (Number(killedVal) || 0)
      return Math.max(3, Math.min(20, 5 + (injured * 2) + (killed * 10)))
    })

    const text = validData.map((item, idx) => {
      const borough = item.borough || 'Unknown'
      const injuredVal = item.number_of_persons_injured
      const killedVal = item.number_of_persons_killed
      const injured = typeof injuredVal === 'string' ? parseFloat(injuredVal) : (Number(injuredVal) || 0)
      const killed = typeof killedVal === 'string' ? parseFloat(killedVal) : (Number(killedVal) || 0)
      const date = item.crash_datetime ? new Date(item.crash_datetime).toLocaleDateString() : 'Unknown date'
      return `${borough}<br>Date: ${date}<br>Injured: ${injured}, Killed: ${killed}`
    })

    return { lat, lon, sizes, text }
  }, [data])

  // Use scatter map with custom projection for NYC area
  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff', family: 'Inter, sans-serif' },
    geo: {
      scope: 'north america',
      projection: {
        type: 'mercator',
        center: { lon: -73.9, lat: 40.7 },
        scale: 8
      },
      bgcolor: 'transparent',
      lakecolor: 'rgba(59, 130, 246, 0.3)',
      landcolor: 'rgba(30, 41, 59, 0.5)',
      subunitcolor: 'rgba(255,255,255,0.2)',
      showlakes: false,
      showland: true,
      showcountries: false,
      showframe: true,
      framecolor: 'rgba(255,255,255,0.3)',
      coastlinecolor: 'rgba(255,255,255,0.2)',
      lonaxis: {
        range: [-74.3, -73.7],
        showgrid: true,
        gridcolor: 'rgba(255,255,255,0.1)',
      },
      lataxis: {
        range: [40.5, 40.9],
        showgrid: true,
        gridcolor: 'rgba(255,255,255,0.1)',
      },
    },
    margin: { l: 0, r: 0, t: 0, b: 0 },
    height: 500,
    autosize: true,
  }

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
    responsive: true,
  }

  if (mapData.lat.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-white/70">
        <p>No valid location data available for visualization</p>
      </div>
    )
  }

  return (
    <Plot
      data={[
        {
          type: 'scattergeo',
          lat: mapData.lat,
          lon: mapData.lon,
          mode: 'markers',
          marker: {
            size: mapData.sizes,
            color: 'rgba(239, 68, 68, 0.7)',
            line: {
              color: 'rgba(239, 68, 68, 1)',
              width: 1,
            },
            sizemode: 'diameter',
            sizemin: 3,
            sizeref: 0.5,
          },
          text: mapData.text,
          hoverinfo: 'text',
          hovertemplate: '%{text}<extra></extra>',
        },
      ]}
      layout={layout}
      config={config}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default MapChart
