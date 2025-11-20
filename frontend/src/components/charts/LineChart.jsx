import React, { useMemo } from 'react'
import Plot from 'react-plotly.js'

function LineChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return { dates: [], crashes: [], injured: [], killed: [] }

    const dateCounts = {}
    const injuredCounts = {}
    const killedCounts = {}

    data.forEach(item => {
      if (item.crash_datetime) {
        const date = new Date(item.crash_datetime)
        if (!isNaN(date.getTime())) {
          // Group by month-year
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          
          dateCounts[monthYear] = (dateCounts[monthYear] || 0) + 1
          
          // Handle injuries - support string, number, or null/undefined
          const injuredVal = item.number_of_persons_injured
          let injured = 0
          if (injuredVal !== null && injuredVal !== undefined && injuredVal !== '') {
            injured = typeof injuredVal === 'string' ? parseFloat(injuredVal) : Number(injuredVal)
            if (isNaN(injured)) injured = 0
          }
          injuredCounts[monthYear] = (injuredCounts[monthYear] || 0) + injured
          
          // Handle fatalities - support string, number, or null/undefined
          const killedVal = item.number_of_persons_killed
          let killed = 0
          if (killedVal !== null && killedVal !== undefined && killedVal !== '') {
            killed = typeof killedVal === 'string' ? parseFloat(killedVal) : Number(killedVal)
            if (isNaN(killed)) killed = 0
          }
          killedCounts[monthYear] = (killedCounts[monthYear] || 0) + killed
        }
      }
    })

    const sortedDates = Object.keys(dateCounts).sort()
    const crashes = sortedDates.map(date => dateCounts[date])
    const injured = sortedDates.map(date => injuredCounts[date] || 0)
    const killed = sortedDates.map(date => killedCounts[date] || 0)

    return { dates: sortedDates, crashes, injured, killed }
  }, [data])

  const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff', family: 'Inter, sans-serif' },
    xaxis: {
      title: 'Month',
      gridcolor: 'rgba(255,255,255,0.1)',
      showgrid: true,
    },
    yaxis: {
      title: 'Count',
      gridcolor: 'rgba(255,255,255,0.1)',
      showgrid: true,
    },
    margin: { l: 60, r: 40, t: 40, b: 60 },
    height: 400,
    hovermode: 'x unified',
    legend: {
      x: 0,
      y: 1,
      font: { color: '#ffffff' },
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
          x: chartData.dates,
          y: chartData.crashes,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Total Crashes',
          line: { color: 'rgba(59, 130, 246, 1)', width: 3 },
          marker: { size: 6, color: 'rgba(59, 130, 246, 1)' },
          hovertemplate: '<b>%{x}</b><br>Crashes: %{y}<extra></extra>',
        },
        {
          x: chartData.dates,
          y: chartData.injured,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Injured',
          line: { color: 'rgba(251, 146, 60, 1)', width: 3 },
          marker: { size: 6, color: 'rgba(251, 146, 60, 1)' },
          hovertemplate: '<b>%{x}</b><br>Injured: %{y}<extra></extra>',
        },
        {
          x: chartData.dates,
          y: chartData.killed,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Fatalities',
          line: { color: 'rgba(239, 68, 68, 1)', width: 3 },
          marker: { size: 6, color: 'rgba(239, 68, 68, 1)' },
          hovertemplate: '<b>%{x}</b><br>Fatalities: %{y}<extra></extra>',
        },
      ]}
      layout={layout}
      config={config}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default LineChart
