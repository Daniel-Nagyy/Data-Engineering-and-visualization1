import React from 'react'
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import LineChart from './charts/LineChart'
import Heatmap from './charts/Heatmap'
import MapChart from './charts/MapChart'

function Dashboard({ data, filters }) {  // Add filters prop
  if (!data || data.length === 0) {
    return null
  }

  // Debug: Check what vehicle types are actually in the filtered data
  const vehicleTypesInData = [...new Set(data.map(d => d.vehicle_type_code_1).concat(data.map(d => d.vehicle_type_code_2)))].filter(Boolean)
  console.log('Filtered data vehicle types:', vehicleTypesInData)
  console.log('Total records:', data.length)
  console.log('Current filters:', filters)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Crashes"
          value={data.length.toLocaleString()}
          icon="🚗"
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Injured"
          value={(() => {
            // Prefer crash-level aggregated counts when present (>0), otherwise count person-level `person_injury` records
            const crashSum = data.reduce((sum, d) => {
              const val = d.number_of_persons_injured
              if (val === null || val === undefined || val === '') return sum
              const num = typeof val === 'string' ? parseFloat(val) : Number(val)
              return sum + (isNaN(num) ? 0 : num)
            }, 0)

            if (crashSum > 0) return crashSum.toLocaleString()

            // Fallback: count rows where `person_injury` indicates an injury
            const personCount = data.reduce((sum, d) => {
              const pi = d.person_injury
              if (!pi) return sum
              const s = pi.toString().toLowerCase()
              return sum + (s.includes('injur') ? 1 : 0)
            }, 0)
            return personCount.toLocaleString()
          })()}
          icon="🏥"
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Fatalities"
          value={(() => {
            const crashSum = data.reduce((sum, d) => {
              const val = d.number_of_persons_killed
              if (val === null || val === undefined || val === '') return sum
              const num = typeof val === 'string' ? parseFloat(val) : Number(val)
              return sum + (isNaN(num) ? 0 : num)
            }, 0)

            if (crashSum > 0) return crashSum.toLocaleString()

            // Fallback: count person-level `person_injury` records that indicate death/killed
            const personCount = data.reduce((sum, d) => {
              const pi = d.person_injury
              if (!pi) return sum
              const s = pi.toString().toLowerCase()
              return sum + ((s.includes('kill') || s.includes('death')) ? 1 : 0)
            }, 0)
            return personCount.toLocaleString()
          })()}
          icon="⚰️"
          color="from-red-500 to-pink-500"
        />
        <StatCard
          title="Unique Collisions"
          value={[...new Set(data.map(d => d.collision_id))].length.toLocaleString()}
          icon="📍"
          color="from-purple-500 to-indigo-500"
        />
      </div>


      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borough Distribution */}
        <div className="glass p-6 animate-slide-up">
          <h2 className="text-xl font-semibold mb-4 text-white">Crashes by Borough</h2>
          <BarChart data={data} />
        </div>

        {/* Vehicle Type Distribution */}
        <div className="glass p-6 animate-slide-up">
          <h2 className="text-xl font-semibold mb-4 text-white">Vehicle Type Distribution</h2>
          <PieChart data={data} filters={filters} />  {/* Pass filters prop */}
        </div>

        {/* Time Series */}
        <div className="glass p-6 animate-slide-up lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Crashes Over Time</h2>
          <LineChart data={data} />
        </div>

        {/* Contributing Factors */}
        <div className="glass p-6 animate-slide-up lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Top Contributing Factors</h2>
          <BarChart data={data} type="factors" />
        </div>

        {/* Heatmap */}
        <div className="glass p-6 animate-slide-up lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Crash Heatmap by Borough & Month</h2>
          <Heatmap data={data} />
        </div>

        {/* Map */}
        <div className="glass p-6 animate-slide-up lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Crash Locations Map</h2>
          <MapChart data={data} />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`glass p-6 bg-gradient-to-br ${color}/20 border-${color.split(' ')[0]}/30 hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}

export default Dashboard