import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import Filters from './components/Filters'
import SearchBar from './components/SearchBar'
import GenerateButton from './components/GenerateButton'

// API base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [data, setData] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    boroughs: [],
    years: [],
    vehicle_types: [],
    contributing_factors: [],
    injury_types: []
  })
  const [filters, setFilters] = useState({
    borough: '',
    year: '',
    vehicle_type: '',
    contributing_factor: '',
    injury_type: '',
    search: ''
  })
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Load filter options on mount
  useEffect(() => {
    loadFilterOptions()
  }, [])

  // Load data when filters change (if data has been loaded before)
  useEffect(() => {
    if (dataLoaded) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, dataLoaded])

  const loadFilterOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/filters`)
      setFilterOptions(response.data)
    } catch (error) {
      console.error('Error loading filter options:', error)
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/data`, filters)
      setData(response.data.data || [])
    } catch (error) {
      console.error('Error loading data:', error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (searchText) => {
    setFilters(prev => ({ ...prev, search: searchText }))
  }

  const handleGenerateReport = () => {
    setDataLoaded(true)
    loadData()
  }

  const handleClearFilters = () => {
    setFilters({
      borough: '',
      year: '',
      vehicle_type: '',
      contributing_factor: '',
      injury_type: '',
      search: ''
    })
    setData([])
    setDataLoaded(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-strong border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NYC Crash Analysis Dashboard
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Motor Vehicle Collisions Visualization & Insights
              </p>
            </div>
            {data.length > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{data.length.toLocaleString()}</div>
                <div className="text-xs text-white/60">Records Found</div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Control Panel */}
        <div className="glass-strong p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Filters Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
              <Filters
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Search Mode</h2>
              <SearchBar
                onSearch={handleSearch}
                searchValue={filters.search}
              />
              <div className="text-sm text-white/60 italic">
                Try: "Brooklyn 2022 sedan crashes" or "Queens injuries"
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center mt-6">
            <GenerateButton
              onClick={handleGenerateReport}
              loading={loading}
              disabled={!filters.borough && !filters.year && !filters.vehicle_type && 
                       !filters.contributing_factor && !filters.injury_type && !filters.search}
            />
          </div>
        </div>

        {/* Dashboard */}
        {data.length > 0 && !loading && (
          <div className="animate-slide-up">
            <Dashboard data={data} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="glass p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-white/70">Loading data...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && dataLoaded && data.length === 0 && (
          <div className="glass p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No Data Found</h3>
            <p className="text-white/70">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Initial State */}
        {!dataLoaded && !loading && (
          <div className="glass p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-2">Ready to Explore</h3>
            <p className="text-white/70 mb-6">Select filters or search, then click Generate Report to visualize NYC crash data</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/20 mt-16">
        <div className="container mx-auto px-6 py-4 text-center text-white/60 text-sm">
          NYC Motor Vehicle Collisions Data | Data Engineering and Visualization Project
        </div>
      </footer>
    </div>
  )
}

export default App
