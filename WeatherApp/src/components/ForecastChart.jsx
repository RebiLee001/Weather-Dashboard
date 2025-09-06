import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow
} from "react-icons/wi";

function ForecastChart({ forecast }) {
  // 🔥 Function to pick icon based on condition
  const getIcon = (condition) => {
    if (!condition) return <WiDaySunny size={28} color="#facc15" />;

    const cond = condition.toLowerCase();
    if (cond.includes("cloud")) return <WiCloud size={28} color="#94a3b8" />;
    if (cond.includes("rain")) return <WiRain size={28} color="#38bdf8" />;
    if (cond.includes("snow")) return <WiSnow size={28} color="#e0f2fe" />;
    if (cond.includes("thunder")) return <WiThunderstorm size={28} color="#f87171" />;
    return <WiDaySunny size={28} color="#facc15" />;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📅 5-Day Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecast}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "8px",
              color: "white"
            }}
          />
          <Line type="monotone" dataKey="temp" stroke="#22d3ee" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Icons under chart */}
      <div className="flex justify-between mt-4">
        {forecast.map((day, i) => (
          <div key={i} className="flex flex-col items-center">
            {getIcon(day.condition)}
            <span className="text-sm mt-1">{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastChart;
