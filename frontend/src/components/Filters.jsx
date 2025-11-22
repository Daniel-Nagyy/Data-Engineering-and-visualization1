import React from 'react'

function Filters({ filterOptions, filters, onFilterChange, onClear }) {
  const hasActiveFilters = filters.borough.length > 0 || filters.year.length > 0 || 
                          filters.vehicle_type.length > 0 || filters.contributing_factor.length > 0 || 
                          filters.injury_type.length > 0

  const handleMultiSelectChange = (key, value, isChecked) => {
    const currentValues = filters[key] || []
    let newValues
    
    if (isChecked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(item => item !== value)
    }
    
    onFilterChange(key, newValues)
  }

  const isSelected = (key, value) => {
    return (filters[key] || []).includes(value)
  }

  return (
    <div className="space-y-4">
      {/* Borough Filter - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Borough
        </label>
        <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg border border-white/20 p-2">
          {filterOptions.boroughs?.map((borough) => (
            <label key={borough} className="flex items-center space-x-2 py-1 px-2 hover:bg-white/10 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected('borough', borough)}
                onChange={(e) => handleMultiSelectChange('borough', borough, e.target.checked)}
                className="rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">{borough}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year Filter - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Year
        </label>
        <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg border border-white/20 p-2">
          {filterOptions.years?.map((year) => (
            <label key={year} className="flex items-center space-x-2 py-1 px-2 hover:bg-white/10 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected('year', year)}
                onChange={(e) => handleMultiSelectChange('year', year, e.target.checked)}
                className="rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle Type Filter - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Vehicle Type
        </label>
        <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg border border-white/20 p-2">
          {filterOptions.vehicle_types?.map((vehicle) => (
            <label key={vehicle} className="flex items-center space-x-2 py-1 px-2 hover:bg-white/10 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected('vehicle_type', vehicle)}
                onChange={(e) => handleMultiSelectChange('vehicle_type', vehicle, e.target.checked)}
                className="rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">{vehicle}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Contributing Factor Filter - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Contributing Factor
        </label>
        <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg border border-white/20 p-2">
          {filterOptions.contributing_factors?.slice(0, 20).map((factor) => (
            <label key={factor} className="flex items-center space-x-2 py-1 px-2 hover:bg-white/10 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected('contributing_factor', factor)}
                onChange={(e) => handleMultiSelectChange('contributing_factor', factor, e.target.checked)}
                className="rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Injury Type Filter - Multi-select */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Injury Type
        </label>
        <div className="max-h-40 overflow-y-auto bg-white/5 rounded-lg border border-white/20 p-2">
          {filterOptions.injury_types?.map((type) => (
            <label key={type} className="flex items-center space-x-2 py-1 px-2 hover:bg-white/10 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected('injury_type', type)}
                onChange={(e) => handleMultiSelectChange('injury_type', type, e.target.checked)}
                className="rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-white text-sm">{type}</span>
            </label>
          ))}
        </div>
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