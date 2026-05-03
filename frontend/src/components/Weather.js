import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeather } from '../services/api';
import './Weather.css';

function Weather({ user }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      let lat = user.latitude || 28.6139; // Default to Delhi
      let lon = user.longitude || 77.2090;

      // Try to get current location if not available
      if (!user.latitude || !user.longitude) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              loadWeatherData(lat, lon);
            },
            () => {
              loadWeatherData(lat, lon);
            }
          );
        } else {
          loadWeatherData(lat, lon);
        }
      } else {
        loadWeatherData(lat, lon);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const loadWeatherData = async (lat, lon) => {
    try {
      const response = await getWeather(lat, lon);
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return <i className="fa-solid fa-cloud-rain"></i>;
    if (desc.includes('cloud')) return <i className="fa-solid fa-cloud"></i>;
    if (desc.includes('clear')) return <i className="fa-solid fa-sun"></i>;
    if (desc.includes('storm')) return <i className="fa-solid fa-cloud-bolt"></i>;
    return <i className="fa-solid fa-cloud-sun"></i>;
  };

  return (
    <div className="weather-container">
      <div className="container">
        <div className="weather-header">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2><i className="fa-solid fa-cloud-sun"></i> Weather Information</h2>
        </div>

        {loading && <div className="loading">Loading weather data...</div>}

        {error && (
          <div className="card">
            <div className="error">{error}</div>
          </div>
        )}

        {weather && !loading && (
          <>
            <div className="weather-card card">
              <div className="weather-main">
                <div className="weather-icon">{getWeatherIcon(weather.description)}</div>
                <div className="weather-temp">{Math.round(weather.temperature)}°C</div>
                <div className="weather-desc">{weather.description}</div>
              </div>

              <div className="weather-details">
                <div className="weather-detail-item">
                  <span className="detail-label">💧 Humidity</span>
                  <span className="detail-value">{weather.humidity}%</span>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-label">💨 Wind Speed</span>
                  <span className="detail-value">{weather.windSpeed} m/s</span>
                </div>
                <div className="weather-detail-item">
                  <span className="detail-label">🌧️ Rain Expected</span>
                  <span className="detail-value">{weather.rainExpected ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="advice-card card">
              <h3>🌾 Farming Advice</h3>
              <p className="advice-text">{weather.advice}</p>
            </div>

            <div className="tips-card card">
              <h3>💡 General Tips</h3>
              <ul>
                {weather.rainExpected ? (
                  <>
                    <li>आज सिंचाई की आवश्यकता नहीं है</li>
                    <li>खेत में जल निकासी की व्यवस्था करें</li>
                    <li>कीटनाशक का छिड़काव टालें</li>
                  </>
                ) : (
                  <>
                    <li>नियमित सिंचाई करें</li>
                    <li>खरपतवार नियंत्रण करें</li>
                    <li>फसल की निगरानी करें</li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;

// Made with Bob
