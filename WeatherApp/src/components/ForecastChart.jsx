import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

function ForecastChart({ forecast }) {
  // ✅ Pick weather icon based on temp or random condition
  const getIcon = (temp) => {
    if (temp > 28) return <WiDaySunny className="text-yellow-400" size={40} />;
    if (temp > 20) return <WiCloud className="text-gray-300" size={40} />;
    if (temp > 10) return <WiRain className="text-blue-400" size={40} />;
    if (temp > 0) return <WiSnow className="text-cyan-200" size={40} />;
    return <WiThunderstorm className="text-purple-400" size={40} />;
  };

  return (
    <div className="w-full h-72 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-3 text-cyan-300">5-Day Forecast</h2>

      {/* Animated Weather Icons */}
      <div className="flex justify-center gap-6 mb-4">
        {forecast.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="flex flex-col items-center">
              {getIcon(day.temp)}
              <p className="text-sm mt-1">{day.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Forecast Line Chart */}
      <ResponsiveContainer width="100%" height="60%">
        <LineChart data={forecast}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid #22d3ee",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;