import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Result.css';

function DiseaseResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="result-container">
        <div className="container">
          <div className="card">
            <h2>No Result Found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/upload')}>
              Upload New Image
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getHealthColor = () => {
    if (result.confidence >= 80) return '#48bb78';
    if (result.confidence >= 60) return '#ed8936';
    return '#e53e3e';
  };

  return (
    <div className="result-container">
      <div className="container">
        <div className="result-header">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2>Disease Detection Result</h2>
        </div>

        <div className="result-card card">
          <div className="result-status" style={{ borderColor: getHealthColor() }}>
            <h3>Disease Detected</h3>
            <div className="disease-name">{result.diseaseName}</div>
            <div className="confidence-badge" style={{ background: getHealthColor() }}>
              Confidence: {result.confidence}%
            </div>
            <div className="health-status">{result.healthStatus}</div>
          </div>

          <div className="treatment-section">
            <h3>💊 Treatment Solution</h3>
            <p>{result.solution}</p>
          </div>

          {result.fertilizer && (
            <div className="treatment-section">
              <h3>🌱 Recommended Fertilizer</h3>
              <p>{result.fertilizer}</p>
            </div>
          )}

          {result.precautions && (
            <div className="treatment-section">
              <h3>⚠️ Precautions</h3>
              <p>{result.precautions}</p>
            </div>
          )}

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/upload')}>
              Upload Another Image
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/chat')}>
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseResult;

// Made with Bob
