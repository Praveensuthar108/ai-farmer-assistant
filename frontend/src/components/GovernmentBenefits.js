import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GovernmentBenefits.css';

function GovernmentBenefits({ user, onLogout }) {
  const navigate = useNavigate();
  const [benefits, setBenefits] = useState([]);
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL_INDIA');
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [language, setLanguage] = useState('english');

  const categories = [
    { value: 'ALL', label: 'All Categories', icon: '📋' },
    { value: 'CROP_LOSS', label: 'Crop Loss Compensation', icon: '🌾' },
    { value: 'SUBSIDY', label: 'Subsidies', icon: '💰' },
    { value: 'INSURANCE', label: 'Crop Insurance', icon: '🛡️' },
    { value: 'LOAN', label: 'Agricultural Loans', icon: '🏦' },
    { value: 'EQUIPMENT', label: 'Equipment Subsidy', icon: '🚜' }
  ];

  const states = [
    { value: 'ALL_INDIA', label: 'All India' },
    { value: 'MAHARASHTRA', label: 'Maharashtra' },
    { value: 'GUJARAT', label: 'Gujarat' },
    { value: 'PUNJAB', label: 'Punjab' },
    { value: 'HARYANA', label: 'Haryana' },
    { value: 'UTTAR_PRADESH', label: 'Uttar Pradesh' },
    { value: 'MADHYA_PRADESH', label: 'Madhya Pradesh' },
    { value: 'RAJASTHAN', label: 'Rajasthan' },
    { value: 'KARNATAKA', label: 'Karnataka' },
    { value: 'TAMIL_NADU', label: 'Tamil Nadu' }
  ];

  useEffect(() => {
    fetchBenefits();
  }, []);

  useEffect(() => {
    filterBenefits();
  }, [benefits, selectedCategory, selectedState]);

  const fetchBenefits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/benefits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBenefits(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching benefits:', err);
      setError('Failed to load government benefits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterBenefits = () => {
    let filtered = benefits;

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(b => b.category === selectedCategory);
    }

    if (selectedState !== 'ALL_INDIA') {
      filtered = filtered.filter(b => b.state === selectedState || b.state === 'ALL_INDIA');
    }

    setFilteredBenefits(filtered);
  };

  const getFieldByLanguage = (benefit, field) => {
    if (language === 'hindi') {
      return benefit[`${field}Hindi`] || benefit[field];
    } else if (language === 'marathi') {
      return benefit[`${field}Marathi`] || benefit[field];
    }
    return benefit[field];
  };

  const openBenefitDetails = (benefit) => {
    setSelectedBenefit(benefit);
  };

  const closeBenefitDetails = () => {
    setSelectedBenefit(null);
  };

  return (
    <div className="benefits-container">
      <header className="benefits-header">
        <div className="header-content">
          <h1>🏛️ Government Benefits & Subsidies</h1>
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <span>Welcome, {user.name}!</span>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Language Selector */}
        <div className="language-selector card">
          <h3>🌐 Select Language / भाषा चुनें / भाषा निवडा</h3>
          <div className="language-buttons">
            <button
              className={`lang-btn ${language === 'english' ? 'active' : ''}`}
              onClick={() => setLanguage('english')}
            >
              English
            </button>
            <button
              className={`lang-btn ${language === 'hindi' ? 'active' : ''}`}
              onClick={() => setLanguage('hindi')}
            >
              हिंदी
            </button>
            <button
              className={`lang-btn ${language === 'marathi' ? 'active' : ''}`}
              onClick={() => setLanguage('marathi')}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="info-banner card">
          <div className="banner-icon">ℹ️</div>
          <div className="banner-content">
            <h3>
              {language === 'hindi' ? 'सरकारी योजनाओं के बारे में जानें' :
               language === 'marathi' ? 'सरकारी योजनांबद्दल जाणून घ्या' :
               'Learn About Government Schemes'}
            </h3>
            <p>
              {language === 'hindi' ? 'फसल नुकसान मुआवजा, सब्सिडी, बीमा और ऋण योजनाओं की जानकारी प्राप्त करें' :
               language === 'marathi' ? 'पीक नुकसान भरपाई, अनुदान, विमा आणि कर्ज योजनांची माहिती मिळवा' :
               'Get information about crop loss compensation, subsidies, insurance, and loan schemes'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section card">
          <h3>🔍 Filter Benefits</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>State:</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="filter-select"
              >
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading government benefits...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message card">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchBenefits}>
              Retry
            </button>
          </div>
        )}

        {/* Benefits Grid */}
        {!loading && !error && (
          <>
            <div className="results-count">
              <h3>
                {filteredBenefits.length} {language === 'hindi' ? 'योजनाएं उपलब्ध' :
                 language === 'marathi' ? 'योजना उपलब्ध' :
                 'Schemes Available'}
              </h3>
            </div>

            {filteredBenefits.length === 0 ? (
              <div className="no-results card">
                <span className="no-results-icon">📭</span>
                <h3>No benefits found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            ) : (
              <div className="benefits-grid">
                {filteredBenefits.map(benefit => (
                  <div key={benefit.id} className="benefit-card card">
                    <div className="benefit-header">
                      <div className="benefit-category">
                        {categories.find(c => c.value === benefit.category)?.icon || '📋'}
                      </div>
                      <div className="benefit-state-badge">{benefit.state.replace('_', ' ')}</div>
                    </div>
                    <h3>{getFieldByLanguage(benefit, 'schemeName')}</h3>
                    <p className="benefit-description">
                      {getFieldByLanguage(benefit, 'description').substring(0, 150)}...
                    </p>
                    <div className="benefit-footer">
                      <button
                        className="btn btn-primary"
                        onClick={() => openBenefitDetails(benefit)}
                      >
                        {language === 'hindi' ? 'विवरण देखें' :
                         language === 'marathi' ? 'तपशील पहा' :
                         'View Details'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Benefit Details Modal */}
      {selectedBenefit && (
        <div className="modal-overlay" onClick={closeBenefitDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeBenefitDetails}>×</button>
            
            <div className="modal-header">
              <h2>{getFieldByLanguage(selectedBenefit, 'schemeName')}</h2>
              <div className="modal-badges">
                <span className="badge badge-category">{selectedBenefit.category.replace('_', ' ')}</span>
                <span className="badge badge-state">{selectedBenefit.state.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="modal-body">
              <section className="modal-section">
                <h3>📝 {language === 'hindi' ? 'विवरण' : language === 'marathi' ? 'वर्णन' : 'Description'}</h3>
                <p>{getFieldByLanguage(selectedBenefit, 'description')}</p>
              </section>

              <section className="modal-section">
                <h3>✅ {language === 'hindi' ? 'पात्रता' : language === 'marathi' ? 'पात्रता' : 'Eligibility'}</h3>
                <p>{getFieldByLanguage(selectedBenefit, 'eligibility')}</p>
              </section>

              <section className="modal-section">
                <h3>💰 {language === 'hindi' ? 'लाभ' : language === 'marathi' ? 'फायदे' : 'Benefits'}</h3>
                <p>{getFieldByLanguage(selectedBenefit, 'benefits')}</p>
              </section>

              <section className="modal-section">
                <h3>📋 {language === 'hindi' ? 'आवेदन कैसे करें' : language === 'marathi' ? 'अर्ज कसा करावा' : 'How to Apply'}</h3>
                <p>{getFieldByLanguage(selectedBenefit, 'howToApply')}</p>
              </section>

              {selectedBenefit.documentsRequired && (
                <section className="modal-section">
                  <h3>📄 {language === 'hindi' ? 'आवश्यक दस्तावेज' : language === 'marathi' ? 'आवश्यक कागदपत्रे' : 'Required Documents'}</h3>
                  <p>{getFieldByLanguage(selectedBenefit, 'documentsRequired')}</p>
                </section>
              )}

              {selectedBenefit.officialWebsite && (
                <section className="modal-section">
                  <h3>🌐 {language === 'hindi' ? 'आधिकारिक वेबसाइट' : language === 'marathi' ? 'अधिकृत संकेतस्थळ' : 'Official Website'}</h3>
                  <a href={selectedBenefit.officialWebsite} target="_blank" rel="noopener noreferrer" className="website-link">
                    {selectedBenefit.officialWebsite}
                  </a>
                </section>
              )}

              {selectedBenefit.helplineNumber && (
                <section className="modal-section">
                  <h3>📞 {language === 'hindi' ? 'हेल्पलाइन नंबर' : language === 'marathi' ? 'हेल्पलाइन क्रमांक' : 'Helpline Number'}</h3>
                  <p className="helpline-number">{selectedBenefit.helplineNumber}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GovernmentBenefits;

// Made with Bob