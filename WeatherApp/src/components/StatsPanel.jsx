import React from "react"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

function Gauge({ label, value, max, color }) {
  const data = [{ name: label, value, fill: color }]

  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-4 w-40 h-40">
      <h4 className="text-sm font-semibold text-gray-200 mb-2">{label}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={12}
          startAngle={180}
          endAngle={0}
          data={data}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, max]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  )
}

function StatsPanel({ weather }) {
  if (!weather) return null

  return (
    <div className="mt-8 grid grid-cols-3 gap-6">
      <Gauge
        label="Humidity"
        value={weather.main.humidity}
        max={100}
        color="#3b82f6"
      />
      <Gauge
        label="Pressure"
        value={weather.main.pressure}
        max={1100}
        color="#10b981"
      />
      <Gauge
        label="Wind (m/s)"
        value={Math.round(weather.wind.speed)}
        max={50}
        color="#f59e0b"
      />
    </div>
  )
}

export default StatsPanel
