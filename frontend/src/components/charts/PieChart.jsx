import React, { useMemo } from 'react'
import Plot from 'react-plotly.js'

function PieChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return { labels: [], values: [] }

    const counts = {}

    data.forEach(item => {
      const vehicle1 = item.vehicle_type_code_1
      const vehicle2 = item.vehicle_type_code_2

      if (vehicle1 && vehicle1 !== 'Unknown' && vehicle1 !== 'Unspecified') {
        counts[vehicle1] = (counts[vehicle1] || 0) + 1
      }
      if (vehicle2 && vehicle2 !== 'Unknown' && vehicle2 !== 'Unspecified') {
        counts[vehicle2] = (counts[vehicle2] || 0) + 1
      }
    })

    // Get top 8 vehicle types
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)

    const labels = sorted.map(([key]) => key)
    const values = sorted.map(([, value]) => value)

    return { labels, values }
  }, [data])

  const colors = [
    'rgba(59, 130, 246, 0.8)',   // blue
    'rgba(147, 51, 234, 0.8)',   // purple
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(34, 197, 94, 0.8)',    // green
    'rgba(251, 146, 60, 0.8)',   // orange
    'rgba(239, 68, 68, 0.8)',    // red
    'rgba(168, 85, 247, 0.8)',   // violet
    'rgba(14, 165, 233, 0.8)',   // sky
  ]

  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff', family: 'Inter, sans-serif', size: 12 },
    margin: { l: 20, r: 20, t: 40, b: 100 },
    height: 500,
    showlegend: true,
    legend: {
      x: 0.5,
      y: -0.15,
      xanchor: 'center',
      orientation: 'h',
      font: { color: '#ffffff', size: 11 },
    },
  }

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
    responsive: true,
  }

  return (
    <Plot
      data={[
        {
          labels: chartData.labels,
          values: chartData.values,
          type: 'pie',
          marker: {
            colors: colors,
            line: {
              color: 'rgba(255,255,255,0.3)',
              width: 2,
            },
          },
          textinfo: 'label+percent',
          textposition: 'outside',
          hovertemplate: '<b>%{label}</b><br>Crashes: %{value}<br>Percentage: %{percent}<extra></extra>',
          hole: 0.4,
        },
      ]}
      layout={layout}
      config={config}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default PieChart
