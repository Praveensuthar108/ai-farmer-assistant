import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UploadImage from './components/UploadImage';
import DiseaseResult from './components/DiseaseResult';
import ChatAssistant from './components/ChatAssistant';
import Weather from './components/Weather';
import GovernmentBenefits from './components/GovernmentBenefits';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    // Redirect based on role
    if (userData.role === 'ADMIN') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user?.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              user?.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <Register onRegister={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              user?.role === 'ADMIN' ? (
                <Navigate to="/admin" />
              ) : (
                <Dashboard user={user} onLogout={handleLogout} />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/upload"
          element={
            isAuthenticated ? (
              <UploadImage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/result/:cropId"
          element={
            isAuthenticated ? (
              <DiseaseResult user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <ChatAssistant user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/weather"
          element={
            isAuthenticated ? (
              <Weather user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/benefits"
          element={
            isAuthenticated ? (
              <GovernmentBenefits user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              user?.role === 'ADMIN' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              user?.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />
            ) : (
              <Home />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// Made with Bob
