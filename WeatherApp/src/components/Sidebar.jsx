import React from "react"
import { Cloud, BarChart, Thermometer, Wind } from "lucide-react"

function Sidebar() {
  return (
    <div className="w-64 bg-indigo-950 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8">FUSION WEATHER</h2>
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 hover:text-indigo-300">
          <Cloud size={18} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-300">
          <BarChart size={18} /> Forecast
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-300">
          <Thermometer size={18} /> Temperature
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-indigo-300">
          <Wind size={18} /> Wind
        </a>
      </nav>
    </div>
  )
}

export default Sidebar
