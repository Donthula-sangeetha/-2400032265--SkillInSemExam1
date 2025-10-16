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
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          condition: data.weather[0].main,
        });
        setError("");
      } else {
        setError("City not found. Try another name!");
        setWeather(null);
      }
    } catch {
      setError("Failed to fetch weather data!");
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #60a5fa, #2563eb)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>🌦 Weather App</h1>

      <form onSubmit={fetchWeather} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            width: "200px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "white",
            color: "#2563eb",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>
      </form>

      {error && <p style={{ color: "lightpink" }}>{error}</p>}

      {weather && (
        <div
          style={{
            backgroundColor: "white",
            color: "#2563eb",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
            width: "260px",
          }}
        >
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.temp}°C</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>☁ Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}
