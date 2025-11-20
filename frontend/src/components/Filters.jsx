import React from 'react'

function Filters({ filterOptions, filters, onFilterChange, onClear }) {
  const hasActiveFilters = filters.borough || filters.year || filters.vehicle_type || 
                          filters.contributing_factor || filters.injury_type

  return (
    <div className="space-y-4">
      {/* Borough Filter */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Borough
        </label>
        <select
          value={filters.borough}
          onChange={(e) => onFilterChange('borough', e.target.value)}
          className="select-modern"
        >
          <option value="">All Boroughs</option>
          {filterOptions.boroughs?.map((borough) => (
            <option key={borough} value={borough} className="bg-slate-800">
              {borough}
            </option>
          ))}
        </select>
      </div>

      {/* Year Filter */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Year
        </label>
        <select
          value={filters.year}
          onChange={(e) => onFilterChange('year', e.target.value)}
          className="select-modern"
        >
          <option value="">All Years</option>
          {filterOptions.years?.map((year) => (
            <option key={year} value={year} className="bg-slate-800">
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle Type Filter */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Vehicle Type
        </label>
        <select
          value={filters.vehicle_type}
          onChange={(e) => onFilterChange('vehicle_type', e.target.value)}
          className="select-modern"
        >
          <option value="">All Vehicle Types</option>
          {filterOptions.vehicle_types?.map((vehicle) => (
            <option key={vehicle} value={vehicle} className="bg-slate-800">
              {vehicle}
            </option>
          ))}
        </select>
      </div>

      {/* Contributing Factor Filter */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Contributing Factor
        </label>
        <select
          value={filters.contributing_factor}
          onChange={(e) => onFilterChange('contributing_factor', e.target.value)}
          className="select-modern"
        >
          <option value="">All Factors</option>
          {filterOptions.contributing_factors?.slice(0, 20).map((factor) => (
            <option key={factor} value={factor} className="bg-slate-800">
              {factor}
            </option>
          ))}
        </select>
      </div>

      {/* Injury Type Filter */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Injury Type
        </label>
        <select
          value={filters.injury_type}
          onChange={(e) => onFilterChange('injury_type', e.target.value)}
          className="select-modern"
        >
          <option value="">All Types</option>
          {filterOptions.injury_types?.map((type) => (
            <option key={type} value={type} className="bg-slate-800">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 font-medium transition-all duration-200 hover:scale-105"
        >
          Clear All Filters
        </button>
      )}
    </div>
  )
}

export default Filters
