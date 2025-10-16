import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 Replace with your key

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].main,
          city: data.name,
        });
        setError("");
      } else {
        setError("City not found. Please try again.");
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-600 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🌦 Weather App</h1>

      <form onSubmit={fetchWeather} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg text-black outline-none w-64"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Weather
        </button>
      </form>

      {error && <p className="text-red-200">{error}</p>}

      {weather && (
        <div className="bg-white text-blue-700 rounded-2xl p-6 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">{weather.city}</h2>
          <p className="text-lg">🌡 {weather.temperature}°C</p>
          <p className="text-lg">💧 Humidity: {weather.humidity}%</p>
          <p className="text-lg">☁ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
