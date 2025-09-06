import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import StatsPanel from "./components/StatsPanel";
import ForecastChart from "./components/ForecastChart";
import CarbonPanel from "./components/CarbonPanel";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // ✅ Load history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // ✅ Save history to localStorage
  useEffect(() => {
    localStorage.setItem("weatherHistory", JSON.stringify(history));
  }, [history]);

  const fetchWeather = async (searchCity = city) => {
    if (!searchCity) return;
    try {
      // ✅ Fetch Current Weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${
          import.meta.env.VITE_OWM_API_KEY
        }&units=metric`
      );
      if (!res.ok) throw new Error("City not found ❌");
      const data = await res.json();
      setWeather(data);
      setError("");

      // ✅ Fetch Forecast (every 8th entry ≈ 1 per day)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${
          import.meta.env.VITE_OWM_API_KEY
        }&units=metric`
      );
      const forecastData = await forecastRes.json();

      const daily = forecastData.list
        .filter((_, idx) => idx % 8 === 0)
        .map((entry) => ({
          date: new Date(entry.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp: entry.main.temp,
        }));

      setForecast(daily);

      // ✅ Update search history
      setHistory((prev) => {
        const updated = [data.name, ...prev.filter((c) => c !== data.name)];
        return updated.slice(0, 5); // keep last 5
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
  };

  // ✅ Check if it's day or night
  const isDaytime = () => {
    if (!weather) return true;
    const now = Math.floor(Date.now() / 1000);
    return now >= weather.sys.sunrise && now <= weather.sys.sunset;
  };

  // ✅ Overlay Effects (randomized rain/snow)
  const renderWeatherEffects = () => {
    if (!weather) return null;
    const condition = weather.weather[0].main.toLowerCase();

    if (condition.includes("rain")) {
      return (
        <div className="rain-container">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${0.8 + Math.random() * 0.5}s`,
                animationDelay: `${Math.random()}s`,
              }}
            ></div>
          ))}
        </div>
      );
    }

    if (condition.includes("snow")) {
      return (
        <div className="snow-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="snowflake"
              style={{
                left: `${Math.random() * 100}vw`,
                fontSize: `${0.8 + Math.random() * 1.2}rem`,
                animationDuration: `${3 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white p-6 flex flex-col items-center animated-bg">
      {/* ☁️ Clouds */}
      <div className="cloud small"></div>
      <div className="cloud medium"></div>
      <div className="cloud large"></div>

      {/* ☀️ Sun or 🌙 Moon */}
      {weather && (
        <div
          className={`absolute top-20 right-20 w-24 h-24 rounded-full ${
            isDaytime()
              ? "bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.7)] animate-spin-slow"
              : "bg-gray-200 shadow-[0_0_40px_15px_rgba(255,255,255,0.5)]"
          }`}
        ></div>
      )}

      {/* 🌧 Rain / ❄ Snow */}
      {renderWeatherEffects()}

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-8 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-cyan-200 drop-shadow-lg">
        🌦 Weather Dashboard
      </h1>

      {/* Search Bar */}
      <div className="flex gap-2 w-full max-w-md z-10">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 px-4 py-2 rounded-lg text-gray-200 bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onClick={() => fetchWeather()}
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* Dashboard Panels */}
      {weather && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 w-full max-w-6xl z-10">
          <div className="glass-card"><WeatherCard weather={weather} /></div>
          <div className="glass-card"><StatsPanel weather={weather} /></div>
          {forecast && (
            <div className="glass-card"><ForecastChart forecast={forecast} /></div>
          )}
          <div className="glass-card"><CarbonPanel weather={weather} /></div>
        </div>
      )}

      {/* Recent Searches */}
      {history.length > 0 && (
        <div className="mt-10 w-full max-w-md glass-card p-4 z-10">
          <h3 className="text-xl font-semibold mb-3">Recent Searches</h3>
          <div className="flex gap-2 flex-wrap">
            {history.map((item, idx) => (
              <button
                key={idx}
                onClick={() => fetchWeather(item)}
                className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-cyan-500/40 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
