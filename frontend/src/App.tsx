import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

function App() {
  const [forecast, setForecast] = useState<WeatherForecast[] | null>(null);

useEffect(() => {
  fetch('http://localhost:5000/weatherforecast')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setForecast(data))
    .catch(err => console.error('Error fetching weather:', err));
}, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {forecast ? (
          <ul>
            {forecast.map(day => (
              <li key={day.date}>
                {day.date}: {day.temperatureC}°C / {day.temperatureF}°F — {day.summary}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading weather forecast...</p>
        )}
      </header>
    </div>
  );
}

export default App;
