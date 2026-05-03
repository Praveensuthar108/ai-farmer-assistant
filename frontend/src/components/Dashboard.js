import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const farmerQuotes = [
    {
      quote: "खेती करना सिर्फ एक पेशा नहीं, यह एक कला है।",
      translation: "Farming is not just a profession, it is an art.",
      author: "Indian Farmer Wisdom",
      image: <i className="fa-solid fa-user"></i>
    },
    {
      quote: "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.",
      author: "John F. Kennedy",
      image: <i className="fa-solid fa-wheat-awn"></i>
    },
    {
      quote: "शेतकरी हा देशाचा खरा पाया आहे.",
      translation: "The farmer is the true foundation of the nation.",
      author: "Marathi Proverb",
      image: <i className="fa-solid fa-tractor"></i>
    },
    {
      quote: "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness.",
      author: "Thomas Jefferson",
      image: <i className="fa-solid fa-seedling"></i>
    },
    {
      quote: "किसान की मेहनत ही देश की ताकत है।",
      translation: "The farmer's hard work is the nation's strength.",
      author: "Hindi Saying",
      image: <i className="fa-solid fa-hand-fist"></i>
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % farmerQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = farmerQuotes[currentQuoteIndex];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1><i className="fa-solid fa-wheat-awn"></i> AI Farmer Assistant</h1>
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span>Welcome, {user.name}!</span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Inspirational Quote Section */}
        <div className="quote-section card">
          <div className="quote-icon">{currentQuote.image}</div>
          <div className="quote-content">
            <p className="quote-text">"{currentQuote.quote}"</p>
            {currentQuote.translation && (
              <p className="quote-translation">{currentQuote.translation}</p>
            )}
            <p className="quote-author">- {currentQuote.author}</p>
          </div>
          <div className="quote-indicators">
            {farmerQuotes.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentQuoteIndex ? 'active' : ''}`}
                onClick={() => setCurrentQuoteIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Farmer Success Stories */}
        <div className="success-stories">
          <h2><i className="fa-solid fa-star"></i> Farmer Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card card">
              <div className="farmer-image"><i className="fa-solid fa-user"></i></div>
              <h3>Rajesh Kumar</h3>
              <p className="location"><i className="fa-solid fa-location-dot"></i> Maharashtra</p>
              <p className="story">"AI helped me detect tomato blight early. Saved my entire crop worth ₹2 lakhs!"</p>
              <div className="story-stats">
                <span><i className="fa-solid fa-seedling"></i> 50 acres</span>
                <span><i className="fa-solid fa-star"></i> 95% success</span>
              </div>
            </div>

            <div className="story-card card">
              <div className="farmer-image"><i className="fa-solid fa-user"></i></div>
              <h3>Suresh Patil</h3>
              <p className="location"><i className="fa-solid fa-location-dot"></i> Pune</p>
              <p className="story">"मराठीत सल्ला मिळतो म्हणून खूप सोपं आहे. माझ्या शेतीत 30% वाढ झाली!"</p>
              <div className="story-stats">
                <span><i className="fa-solid fa-wheat-awn"></i> 30 acres</span>
                <span><i className="fa-solid fa-star"></i> 30% growth</span>
              </div>
            </div>

            <div className="story-card card">
              <div className="farmer-image"><i className="fa-solid fa-user"></i></div>
              <h3>Amit Sharma</h3>
              <p className="location"><i className="fa-solid fa-location-dot"></i> Gujarat</p>
              <p className="story">"Weather predictions help me plan irrigation perfectly. Water usage reduced by 40%!"</p>
              <div className="story-stats">
                <span><i className="fa-solid fa-tractor"></i> 75 acres</span>
                <span><i className="fa-solid fa-star"></i> 40% savings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="features-section">
          <h2><i className="fa-solid fa-rocket"></i> Quick Actions</h2>
          <div className="features-grid">
            <div className="feature-card card" onClick={() => navigate('/upload')}>
              <div className="feature-icon"><i className="fa-solid fa-camera"></i></div>
              <h3>Upload Crop Image</h3>
              <p>Detect diseases from crop photos instantly</p>
              <div className="feature-badge">AI Powered</div>
            </div>

            <div className="feature-card card" onClick={() => navigate('/chat')}>
              <div className="feature-icon"><i className="fa-solid fa-comments"></i></div>
              <h3>Chat Assistant</h3>
              <p>Get farming advice in Hindi/Marathi</p>
              <div className="feature-badge">24/7 Available</div>
            </div>

            <div className="feature-card card" onClick={() => navigate('/weather')}>
              <div className="feature-icon"><i className="fa-solid fa-cloud-sun"></i></div>
              <h3>Weather Info</h3>
              <p>Get weather-based recommendations</p>
              <div className="feature-badge">Real-time</div>
            </div>

            <div className="feature-card card" onClick={() => navigate('/benefits')}>
              <div className="feature-icon"><i className="fa-solid fa-landmark"></i></div>
              <h3>Government Benefits</h3>
              <p>Explore subsidies and crop loss compensation</p>
              <div className="feature-badge">New</div>
            </div>
          </div>
        </div>

        {/* Farming Tips */}
        <div className="tips-section card">
          <h3><i className="fa-solid fa-lightbulb"></i> Today's Farming Tips</h3>
          <div className="tips-grid">
            <div className="tip-item">
              <span className="tip-icon"><i className="fa-solid fa-seedling"></i></span>
              <div>
                <h4>Early Detection</h4>
                <p>Check your crops daily for early signs of disease</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon"><i className="fa-solid fa-droplet"></i></span>
              <div>
                <h4>Smart Irrigation</h4>
                <p>Water crops in early morning or late evening</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon"><i className="fa-solid fa-wheat-awn"></i></span>
              <div>
                <h4>Crop Rotation</h4>
                <p>Rotate crops to maintain soil health</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
              <div>
                <h4>Regular Monitoring</h4>
                <p>Use AI to monitor crop health regularly</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="info-section card">
          <h3><i className="fa-solid fa-clipboard-list"></i> How It Works</h3>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4><i className="fa-solid fa-camera"></i> Upload Photo</h4>
                <p>Take a clear photo of your crop</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4><i className="fa-solid fa-magnifying-glass"></i> AI Analysis</h4>
                <p>AI detects diseases automatically</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4><i className="fa-solid fa-pills"></i> Get Treatment</h4>
                <p>Receive treatment recommendations</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4><i className="fa-solid fa-comments"></i> Expert Advice</h4>
                <p>Chat with AI for more guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// Made with Bob
