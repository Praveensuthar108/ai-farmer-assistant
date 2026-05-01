import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🌾 AI Farmer Assistant</h1>
        <div className="user-info">
          <span>Welcome, {user.name}!</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="container">
        <div className="welcome-card card">
          <h2>Welcome to AI Farmer Assistant</h2>
          <p>Your smart farming companion for crop disease detection and agricultural advice.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card card" onClick={() => navigate('/upload')}>
            <div className="feature-icon">📸</div>
            <h3>Upload Crop Image</h3>
            <p>Detect diseases from crop photos</p>
          </div>

          <div className="feature-card card" onClick={() => navigate('/chat')}>
            <div className="feature-icon">💬</div>
            <h3>Chat Assistant</h3>
            <p>Get farming advice in Hindi/Marathi</p>
          </div>

          <div className="feature-card card" onClick={() => navigate('/weather')}>
            <div className="feature-icon">🌤️</div>
            <h3>Weather Info</h3>
            <p>Get weather-based recommendations</p>
          </div>
        </div>

        <div className="info-section card">
          <h3>How It Works</h3>
          <ol>
            <li>📸 Upload a photo of your crop</li>
            <li>🔍 AI detects diseases automatically</li>
            <li>💊 Get treatment recommendations</li>
            <li>💬 Chat with AI for more advice</li>
            <li>🌤️ Check weather for farming tips</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// Made with Bob
