import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminStats } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCrops: 0,
    totalDiseases: 0,
    totalChats: 0,
    recentUsers: [],
    diseaseStats: [],
    cropStats: [],
    userGrowth: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getAdminStats(timeRange);
      if (response && response.data) {
        setStats(response.data);
      } else {
        throw new Error('No data received');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use mock data when backend is not available
      setStats({
        totalUsers: 1247,
        activeUsers: 892,
        totalCrops: 3456,
        totalDiseases: 2134,
        totalChats: 5678,
        recentUsers: [
          { id: 1, name: 'Rajesh Kumar', phone: '9876543210', joinedDate: '2026-05-01', location: 'Maharashtra' },
          { id: 2, name: 'Suresh Patil', phone: '9876543211', joinedDate: '2026-05-01', location: 'Pune' },
          { id: 3, name: 'Amit Sharma', phone: '9876543212', joinedDate: '2026-04-30', location: 'Gujarat' },
          { id: 4, name: 'Vijay Singh', phone: '9876543213', joinedDate: '2026-04-30', location: 'Rajasthan' },
          { id: 5, name: 'Ramesh Yadav', phone: '9876543214', joinedDate: '2026-04-29', location: 'UP' }
        ],
        diseaseStats: [
          { name: 'Tomato Late Blight', count: 456, percentage: 21.4 },
          { name: 'Potato Early Blight', count: 389, percentage: 18.2 },
          { name: 'Corn Common Rust', count: 312, percentage: 14.6 },
          { name: 'Apple Scab', count: 278, percentage: 13.0 },
          { name: 'Grape Black Rot', count: 234, percentage: 11.0 },
          { name: 'Others', count: 465, percentage: 21.8 }
        ],
        cropStats: [
          { crop: 'Tomato', count: 892, color: '#ef4444' },
          { crop: 'Potato', count: 756, color: '#f59e0b' },
          { crop: 'Corn', count: 634, color: '#eab308' },
          { crop: 'Apple', count: 512, color: '#22c55e' },
          { crop: 'Grape', count: 445, color: '#8b5cf6' },
          { crop: 'Others', count: 217, color: '#6b7280' }
        ],
        userGrowth: [
          { month: 'Jan', users: 120 },
          { month: 'Feb', users: 245 },
          { month: 'Mar', users: 389 },
          { month: 'Apr', users: 567 },
          { month: 'May', users: 892 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, subtitle, color, trend }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        <div className="stat-subtitle">
          {subtitle}
          {trend && (
            <span className={`trend ${trend > 0 ? 'up' : 'down'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-left">
          <h1>🌾 Admin Dashboard</h1>
          <p>AI Farmer Assistant Analytics</p>
        </div>
        <div className="header-right">
          <select 
            className="time-range-select"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <div className="user-info">
            <span>Admin: {user?.name || 'Administrator'}</span>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats Overview */}
        <section className="stats-overview">
          <StatCard
            icon="👥"
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            subtitle="Registered farmers"
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            trend={12.5}
          />
          <StatCard
            icon="✅"
            title="Active Users"
            value={stats.activeUsers.toLocaleString()}
            subtitle={`${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active rate`}
            color="linear-gradient(135deg, #4a7c2c 0%, #6ba83d 100%)"
            trend={8.3}
          />
          <StatCard
            icon="🌱"
            title="Total Crops"
            value={stats.totalCrops.toLocaleString()}
            subtitle="Crops analyzed"
            color="linear-gradient(135deg, #f59e0b 0%, #f97316 100%)"
            trend={15.7}
          />
          <StatCard
            icon="🔍"
            title="Diseases Detected"
            value={stats.totalDiseases.toLocaleString()}
            subtitle="Disease detections"
            color="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
            trend={-3.2}
          />
          <StatCard
            icon="💬"
            title="Chat Sessions"
            value={stats.totalChats.toLocaleString()}
            subtitle="AI conversations"
            color="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
            trend={22.1}
          />
        </section>

        {/* Charts Section */}
        <section className="charts-section">
          {/* User Growth Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>📈 User Growth Trend</h3>
              <span className="chart-subtitle">Monthly active users</span>
            </div>
            <div className="bar-chart">
              {stats.userGrowth.map((data, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-wrapper">
                    <div 
                      className="bar"
                      style={{ 
                        height: `${(data.users / Math.max(...stats.userGrowth.map(d => d.users))) * 100}%`,
                        background: 'linear-gradient(180deg, #4a7c2c 0%, #6ba83d 100%)'
                      }}
                    >
                      <span className="bar-value">{data.users}</span>
                    </div>
                  </div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disease Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>🦠 Disease Distribution</h3>
              <span className="chart-subtitle">Most common diseases</span>
            </div>
            <div className="disease-list">
              {stats.diseaseStats.map((disease, index) => (
                <div key={index} className="disease-item">
                  <div className="disease-info">
                    <span className="disease-name">{disease.name}</span>
                    <span className="disease-count">{disease.count} cases</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${disease.percentage}%`,
                        background: `hsl(${120 - (disease.percentage * 1.2)}, 70%, 50%)`
                      }}
                    >
                      <span className="progress-text">{disease.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crop Statistics */}
        <section className="crop-stats-section">
          <div className="chart-card full-width">
            <div className="chart-header">
              <h3>🌾 Crop Analysis</h3>
              <span className="chart-subtitle">Crops by upload count</span>
            </div>
            <div className="crop-grid">
              {stats.cropStats.map((crop, index) => (
                <div key={index} className="crop-card">
                  <div 
                    className="crop-icon"
                    style={{ background: crop.color }}
                  >
                    {crop.crop.charAt(0)}
                  </div>
                  <h4>{crop.crop}</h4>
                  <div className="crop-count">{crop.count}</div>
                  <div className="crop-percentage">
                    {((crop.count / stats.totalCrops) * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Users Table */}
        <section className="recent-users-section">
          <div className="table-card">
            <div className="table-header">
              <h3>👥 Recent Users</h3>
              <button className="btn-link" onClick={() => navigate('/admin/users')}>
                View All →
              </button>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Joined Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{user.name.charAt(0)}</div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.phone}</td>
                      <td>{user.location}</td>
                      <td>{new Date(user.joinedDate).toLocaleDateString()}</td>
                      <td>
                        <span className="status-badge active">Active</span>
                      </td>
                      <td>
                        <button className="btn-icon" title="View Details">👁️</button>
                        <button className="btn-icon" title="Edit">✏️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="action-card" onClick={() => navigate('/admin/users')}>
            <span className="action-icon">👥</span>
            <h4>Manage Users</h4>
            <p>View and manage all farmers</p>
          </div>
          <div className="action-card" onClick={() => navigate('/admin/diseases')}>
            <span className="action-icon">🦠</span>
            <h4>Disease Reports</h4>
            <p>Analyze disease patterns</p>
          </div>
          <div className="action-card" onClick={() => navigate('/admin/crops')}>
            <span className="action-icon">🌱</span>
            <h4>Crop Analytics</h4>
            <p>View crop statistics</p>
          </div>
          <div className="action-card" onClick={() => navigate('/admin/settings')}>
            <span className="action-icon">⚙️</span>
            <h4>Settings</h4>
            <p>Configure system settings</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;

// Made with Bob