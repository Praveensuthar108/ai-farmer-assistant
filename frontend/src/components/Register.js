import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import './Auth.css';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    language: 'hi',
    role: 'USER',
    latitude: '',
    longitude: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      };
      const response = await register(submitData);
      onRegister(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1><i className="fa-solid fa-wheat-awn"></i> AI Farmer Assistant</h1>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="input-group">
            <label>Language</label>
            <select name="language" value={formData.language} onChange={handleChange}>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="mr">Marathi (मराठी)</option>
            </select>
          </div>
          <div className="input-group">
            <label>Register As</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="USER"><i className="fa-solid fa-user"></i> Farmer (User)</option>
              <option value="ADMIN"><i className="fa-solid fa-gear"></i> Administrator</option>
            </select>
          </div>
          <div className="input-group">
            <label>Location (Optional)</label>
            <button type="button" className="btn btn-secondary" onClick={getLocation}>
              Get My Location
            </button>
            {formData.latitude && formData.longitude && (
              <div className="success">
                Location captured: {formData.latitude}, {formData.longitude}
              </div>
            )}
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

// Made with Bob
