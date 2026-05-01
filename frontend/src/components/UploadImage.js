import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectDisease } from '../services/api';
import './Upload.css';

function UploadImage({ user }) {
  const [cropName, setCropName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !cropName) {
      setError('Please select an image and enter crop name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('userId', user.userId);
      formData.append('cropName', cropName);
      formData.append('image', image);

      const response = await detectDisease(formData);
      navigate(`/result/${response.data.cropId}`, { state: { result: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to detect disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="container">
        <div className="upload-header">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2>Upload Crop Image</h2>
        </div>

        <div className="upload-card card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Crop Name</label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g., Tomato, Potato, Wheat"
                required
              />
            </div>

            <div className="input-group">
              <label>Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Detecting Disease...' : 'Detect Disease'}
            </button>
          </form>

          <div className="upload-tips">
            <h3>📸 Tips for Best Results:</h3>
            <ul>
              <li>Take a clear, well-lit photo</li>
              <li>Focus on affected leaves or parts</li>
              <li>Avoid blurry images</li>
              <li>Capture close-up of symptoms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;

// Made with Bob
