import React from "react"
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"

function CarbonPanel({ weather }) {
  if (!weather) return null

  const temp = weather.main.temp
  let demand = ""
  let carbonScore = 0
  let trend = "neutral"

  if (temp >= 30) {
    demand = "High Cooling Demand (AC usage)"
    carbonScore = 80
    trend = "up"
  } else if (temp >= 20 && temp < 30) {
    demand = "Moderate Cooling Demand"
    carbonScore = 50
    trend = "neutral"
  } else if (temp >= 10 && temp < 20) {
    demand = "Moderate Heating Demand"
    carbonScore = 40
    trend = "neutral"
  } else {
    demand = "High Heating Demand"
    carbonScore = 70
    trend = "up"
  }

  return (
    <div className="glass-card p-6 flex flex-col items-center text-white">
      <h3 className="text-lg font-bold mb-4">🌍 Carbon Footprint</h3>
      <div className="flex items-center gap-2">
        <p className="text-4xl font-extrabold">{carbonScore}</p>
        <span className="text-sm opacity-80">CO₂ Index</span>
        {trend === "up" && <ArrowUpCircle className="text-red-400 w-6 h-6" />}
        {trend === "down" && <ArrowDownCircle className="text-green-400 w-6 h-6" />}
      </div>
      <p className="mt-2 text-sm text-center opacity-90">{demand}</p>

      <div className="mt-4 h-2 bg-gray-700 rounded-full w-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
          style={{ width: `${carbonScore}%` }}
        ></div>
      </div>
    </div>
  )
}

export default CarbonPanel
