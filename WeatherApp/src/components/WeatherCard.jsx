import React from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDayFog,
} from "react-icons/wi";

function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, main, weather: weatherInfo, wind } = weather;
  const description = weatherInfo[0]?.description || "";
  const temp = Math.round(main.temp);

  // ✅ Icon picker based on description
  const getIcon = (desc) => {
    if (desc.includes("cloud")) return <WiCloud size={80} className="text-gray-200" />;
    if (desc.includes("rain")) return <WiRain size={80} className="text-blue-400" />;
    if (desc.includes("snow")) return <WiSnow size={80} className="text-cyan-200" />;
    if (desc.includes("storm")) return <WiThunderstorm size={80} className="text-purple-400" />;
    if (desc.includes("fog") || desc.includes("mist")) return <WiDayFog size={80} className="text-gray-400" />;
    return <WiDaySunny size={80} className="text-yellow-400" />;
  };

  return (
    <div className="p-6 text-center">
      {/* Animated Weather Icon */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {getIcon(description)}
      </motion.div>

      {/* City Name */}
      <h2 className="text-2xl font-bold mt-4">{name}</h2>

      {/* Description */}
      <p className="capitalize text-gray-300">{description}</p>

      {/* Temperature */}
      <motion.p
        className="text-5xl font-extrabold mt-2 text-cyan-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {temp}°C
      </motion.p>

      {/* Extra Stats */}
      <div className="flex justify-around mt-4 text-sm text-gray-200">
        <p>💧 {main.humidity}%</p>
        <p>💨 {wind.speed} m/s</p>
        <p>🌡 {main.pressure} hPa</p>
      </div>
    </div>
  );
}

export default WeatherCard;
