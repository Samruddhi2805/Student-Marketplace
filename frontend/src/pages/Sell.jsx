import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const CATEGORIES = ['Books', 'Electronics', 'Hostel Essentials', 'Cycles', 'Notes', 'Lab Equipment', 'Calculators & Drafting', 'Sports & Fitness', 'Musical Instruments'];
const PAYMENT_METHODS = ['Cash on Delivery', 'UPI on Meetup', 'Meetup Payment'];
const MEETUP_LOCATIONS = ['Library', 'Hostel Gate', 'Cafeteria', 'Block A', 'Block B', 'Main Gate', 'Sports Ground', 'Canteen', 'Other'];

function Sell() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Books');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [meetupLocation, setMeetupLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Route protection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleSell = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', Number(price));
    formData.append('description', description);
    formData.append('category', category);
    formData.append('paymentMethod', paymentMethod);
    formData.append('meetupLocation', meetupLocation === 'Other' ? customLocation : meetupLocation);
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      await API.post('/product', formData);
      setSuccess('Product listed successfully! Redirecting...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <div className="form-header">
          <h2>List an Item</h2>
          <p>Sell your used items to your campus batchmates</p>
        </div>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSell}>
          {/* Basic Info */}
          <div className="form-group">
            <label>Product Title</label>
            <input type="text" className="form-control" value={title}
              onChange={(e) => setTitle(e.target.value)} required
              placeholder="E.g., Engineering Mathematics Textbook" />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" className="form-control" value={price}
              onChange={(e) => setPrice(e.target.value)} required placeholder="150" />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={category}
              onChange={(e) => setCategory(e.target.value)} required>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Product Photos (Optional, Up to 5)</label>
            <input type="file" multiple accept="image/*" className="form-control"
              onChange={(e) => setImageFiles(Array.from(e.target.files))} />
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
              Hold Ctrl (or Cmd) to select multiple photos.
            </small>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={description}
              onChange={(e) => setDescription(e.target.value)} required rows="3"
              placeholder="Describe the condition, age, and any defects..." />
          </div>

          {/* Campus Transaction Info */}
          <div style={{
            background: 'rgba(0, 245, 255, 0.04)',
            border: '1px solid rgba(0, 245, 255, 0.15)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--primary-color)' }}>
              🏫 Campus Transaction Details
            </h4>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label>Payment Method</label>
              <select className="form-control" value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}>
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <small style={{ color: 'var(--light-text)', fontSize: '0.8rem' }}>
                All payments happen offline during the campus meetup
              </small>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Preferred Meetup Location (Optional)</label>
              <select className="form-control" value={meetupLocation}
                onChange={(e) => setMeetupLocation(e.target.value)}>
                <option value="">-- Select a location --</option>
                {MEETUP_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              {meetupLocation === 'Other' && (
                <div style={{ marginTop: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Type Custom Meetup Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Biotech Lab Room 302, Gym Entrance"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Listing Product...' : '🚀 List Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sell;
