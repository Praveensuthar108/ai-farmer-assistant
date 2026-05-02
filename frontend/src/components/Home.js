import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="nav-brand">
            <span className="logo"><i className="fa-solid fa-wheat-awn"></i></span>
            <h1>AI Farmer Assistant</h1>
          </div>
          <div className="nav-links">
            <button className="btn-link" onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>About</button>
            <button className="btn-link" onClick={() => navigate('/admin')} title="Admin Dashboard">
              <i className="fa-solid fa-gear"></i> Admin
            </button>
            <button className="btn-link" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Smart Farming with <span className="gradient-text">AI Technology</span>
            </h1>
            <p className="hero-subtitle">
              Detect crop diseases instantly, get expert advice in your language, and make informed farming decisions with our AI-powered assistant.
            </p>
            <div className="hero-buttons">
              <button className="btn-hero-primary" onClick={() => navigate('/register')}>
                Start Free Trial
              </button>
              <button className="btn-hero-secondary" onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}>
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>10K+</h3>
                <p>Active Farmers</p>
              </div>
              <div className="stat">
                <h3>50K+</h3>
                <p>Crops Analyzed</p>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <p>Accuracy Rate</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="icon"><i className="fa-solid fa-seedling"></i></span>
              <p>Disease Detection</p>
            </div>
            <div className="floating-card card-2">
              <span className="icon"><i className="fa-solid fa-comments"></i></span>
              <p>AI Chat Support</p>
            </div>
            <div className="floating-card card-3">
              <span className="icon"><i className="fa-solid fa-cloud-sun"></i></span>
              <p>Weather Insights</p>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Powerful Features for Modern Farming</h2>
          <p>Everything you need to protect and grow your crops</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-camera"></i></div>
            <h3>Instant Disease Detection</h3>
            <p>Upload crop photos and get instant AI-powered disease diagnosis with 95% accuracy</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Real-time analysis</li>
              <li><i className="fa-solid fa-check"></i> Multiple crop support</li>
              <li><i className="fa-solid fa-check"></i> Detailed reports</li>
            </ul>
          </div>

          <div className="feature-card featured">
            <div className="badge">Most Popular</div>
            <div className="feature-icon"><i className="fa-solid fa-comments"></i></div>
            <h3>AI Chat Assistant</h3>
            <p>Get expert farming advice in Hindi and Marathi, powered by advanced AI</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> 24/7 availability</li>
              <li><i className="fa-solid fa-check"></i> Multi-language support</li>
              <li><i className="fa-solid fa-check"></i> Personalized advice</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-cloud-sun"></i></div>
            <h3>Weather Intelligence</h3>
            <p>Real-time weather data with farming recommendations for your location</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> 7-day forecast</li>
              <li><i className="fa-solid fa-check"></i> Crop-specific tips</li>
              <li><i className="fa-solid fa-check"></i> Alert notifications</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-pills"></i></div>
            <h3>Treatment Solutions</h3>
            <p>Get detailed treatment plans with fertilizer recommendations and precautions</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Step-by-step guides</li>
              <li><i className="fa-solid fa-check"></i> Product suggestions</li>
              <li><i className="fa-solid fa-check"></i> Safety measures</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-chart-line"></i></div>
            <h3>Crop History</h3>
            <p>Track all your crops and disease detections in one organized dashboard</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Complete history</li>
              <li><i className="fa-solid fa-check"></i> Progress tracking</li>
              <li><i className="fa-solid fa-check"></i> Data insights</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-landmark"></i></div>
            <h3>Government Benefits</h3>
            <p>Access information about subsidies, crop loss compensation, and schemes</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Crop loss compensation</li>
              <li><i className="fa-solid fa-check"></i> Subsidy schemes</li>
              <li><i className="fa-solid fa-check"></i> Insurance programs</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><i className="fa-solid fa-lock"></i></div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and secure with industry-standard protection</p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> End-to-end encryption</li>
              <li><i className="fa-solid fa-check"></i> Privacy first</li>
              <li><i className="fa-solid fa-check"></i> GDPR compliant</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in three simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Sign Up Free</h3>
              <p>Create your account in seconds with just your phone number</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Upload Crop Photo</h3>
              <p>Take a picture of your crop and upload it to our AI system</p>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Instant Results</h3>
              <p>Receive disease diagnosis and treatment recommendations immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>Why Farmers Trust Us</h2>
            <div className="benefit-item">
              <span className="benefit-icon"><i className="fa-solid fa-bolt"></i></span>
              <div>
                <h4>Lightning Fast</h4>
                <p>Get disease detection results in under 5 seconds</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon"><i className="fa-solid fa-bullseye"></i></span>
              <div>
                <h4>Highly Accurate</h4>
                <p>95% accuracy rate backed by advanced AI technology</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon"><i className="fa-solid fa-earth-americas"></i></span>
              <div>
                <h4>Local Language Support</h4>
                <p>Available in Hindi and Marathi for better understanding</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
              <div>
                <h4>Save Money</h4>
                <p>Early detection helps prevent crop loss and saves costs</p>
              </div>
            </div>
          </div>
          <div className="benefits-image">
            <div className="image-placeholder">
              <span className="placeholder-icon"><i className="fa-solid fa-wheat-awn"></i></span>
              <p>Helping farmers grow better crops</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Farmers Say</h2>
          <p>Real stories from real farmers</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
            <p className="testimonial-text">
              "This app saved my tomato crop! The AI detected early blight before I even noticed it. Highly recommended!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"><i className="fa-solid fa-user"></i></div>
              <div>
                <h4>Rajesh Kumar</h4>
                <p>Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
            <p className="testimonial-text">
              "मराठीत सल्ला मिळतो म्हणून खूप सोपं आहे. AI चॅट खूप मदत करतो!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"><i className="fa-solid fa-user"></i></div>
              <div>
                <h4>Suresh Patil</h4>
                <p>Pune</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars"><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>
            <p className="testimonial-text">
              "Weather updates help me plan irrigation perfectly. The treatment advice is very practical and easy to follow."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"><i className="fa-solid fa-user"></i></div>
              <div>
                <h4>Amit Sharma</h4>
                <p>Gujarat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About AI Farmer Assistant</h2>
            <p className="about-intro">
              We are dedicated to empowering farmers with cutting-edge AI technology to protect their crops and increase productivity.
            </p>
            <div className="about-mission">
              <h3><i className="fa-solid fa-bullseye"></i> Our Mission</h3>
              <p>
                To make advanced agricultural technology accessible to every farmer, helping them detect crop diseases early,
                get expert advice in their local language, and make data-driven farming decisions.
              </p>
            </div>
            <div className="about-vision">
              <h3><i className="fa-solid fa-star"></i> Our Vision</h3>
              <p>
                A future where every farmer has access to AI-powered tools that help them grow healthier crops,
                reduce losses, and improve their livelihood through smart farming practices.
              </p>
            </div>
            <div className="about-values">
              <h3><i className="fa-solid fa-heart"></i> Our Values</h3>
              <ul>
                <li><strong>Accessibility:</strong> Making technology simple and available to all farmers</li>
                <li><strong>Innovation:</strong> Continuously improving our AI models for better accuracy</li>
                <li><strong>Local Support:</strong> Providing assistance in Hindi and Marathi languages</li>
                <li><strong>Sustainability:</strong> Promoting eco-friendly farming practices</li>
              </ul>
            </div>
          </div>
          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="about-stat-icon"><i className="fa-solid fa-wheat-awn"></i></div>
              <h4>10,000+</h4>
              <p>Farmers Helped</p>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
              <h4>50,000+</h4>
              <p>Crops Analyzed</p>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon"><i className="fa-solid fa-bullseye"></i></div>
              <h4>95%</h4>
              <p>Accuracy Rate</p>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon"><i className="fa-solid fa-earth-americas"></i></div>
              <h4>3</h4>
              <p>Languages Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Farming?</h2>
          <p>Join thousands of farmers already using AI to protect their crops</p>
          <button className="btn-cta" onClick={() => navigate('/register')}>
            Get Started Free
          </button>
          <p className="cta-note">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fa-solid fa-wheat-awn"></i> AI Farmer Assistant</h3>
            <p>Empowering farmers with AI technology for better crop management and disease prevention.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><button onClick={() => navigate('/login')}>Login</button></li>
              <li><button onClick={() => navigate('/register')}>Sign Up</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Languages</h4>
            <ul>
              <li><i className="fa-solid fa-language"></i> Hindi</li>
              <li><i className="fa-solid fa-language"></i> Marathi</li>
              <li><i className="fa-solid fa-language"></i> English</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 AI Farmer Assistant. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Admin Button */}
      <button
        className="floating-admin-btn"
        onClick={() => navigate('/admin')}
        title="Admin Dashboard"
      >
        <i className="fa-solid fa-gear"></i>
      </button>
    </div>
  );
}

export default Home;

// Made with Bob