import React from "react"

function SearchBar({ city, setCity, fetchWeather, fetchForecast }) {
  const handleSearch = () => {
    fetchWeather(city)
    fetchForecast(city)
  }

  return (
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:bg-indigo-100 transition"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
