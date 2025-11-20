import React, { useState } from 'react'

function SearchBar({ onSearch, searchValue }) {
  const [inputValue, setInputValue] = useState(searchValue || '')

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearch(value)
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-white/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search: 'Brooklyn 2022 sedan crashes' or 'Queens injuries'..."
          className="input-modern pl-12 pr-12"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
