import React from 'react'

function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative px-8 py-4 text-lg font-bold rounded-lg
        transition-all duration-300 transform
        ${disabled || loading
          ? 'bg-gray-600/50 cursor-not-allowed opacity-50'
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 active:scale-95 cursor-pointer shadow-2xl hover:shadow-purple-500/50'
        }
        text-white
        flex items-center gap-3
        min-w-[200px]
      `}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Generate Report</span>
        </>
      )}
    </button>
  )
}

export default GenerateButton
