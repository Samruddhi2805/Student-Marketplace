import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

// Check if email looks like a college/university email
function isVerifiedStudent(email) {
  if (!email) return false;
  const domain = email.split('@')[1] || '';
  // Exclude common free providers
  const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  return !freeProviders.includes(domain.toLowerCase());
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const myEmail = token ? JSON.parse(atob(token.split('.')[1])).email : null;

  const CATEGORIES = ['All', 'Books', 'Electronics', 'Hostel Essentials', 'Cycles', 'Notes', 'Lab Equipment', 'Calculators & Drafting', 'Sports & Fitness', 'Musical Instruments'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to fetch products. Is the server running?');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleChat = (seller, title) => {
    if (!token) {
      alert('Please login to contact the seller.');
      navigate('/login');
      return;
    }
    navigate(`/chat/${encodeURIComponent(seller)}/${encodeURIComponent(title)}`);
  };

  const handleReport = (title) => {
    alert(`Thank you for reporting "${title}". Our team will review this listing.`);
  };

  const handleDeleteProduct = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the listing for "${title}"?`)) return;
    try {
      await API.delete(`/product/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || 'Failed to delete listing.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Sold' ? 'Available' : 'Sold';
    try {
      const res = await API.patch(`/product/${id}/status`, { status: nextStatus });
      setProducts(prev => prev.map(p => p._id === id ? { ...p, status: res.data.status } : p));
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || 'Failed to update status.');
    }
  };

  const getPaymentIcon = (method) => {
    if (!method) return '💵';
    if (method.includes('UPI')) return '📱';
    if (method.includes('Cash')) return '💵';
    return '🤝';
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <div className="container">
          <h1>Buy & Sell Within Your Campus</h1>
          <p style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--primary-color)', marginBottom: '6px' }}>
            FROM STUDENTS. FOR STUDENTS.
          </p>
          <p>Safe offline transactions. Campus meetup. No online payments.</p>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for books, cycles, lab equipment..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCategoryFilter('All'); // Auto-reset category to "All" when typing a search
              }}
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div style={{ background: 'rgba(2, 8, 20, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,245,255,0.07)', padding: '12px 0', marginBottom: '24px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setSearchTerm(''); // Clear search input when switching/browsing categories
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,245,255,0.15)',
                  background: categoryFilter === cat ? 'rgba(0,245,255,0.15)' : 'rgba(2,8,20,0.6)',
                  color: categoryFilter === cat ? 'var(--cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  fontSize: '0.82rem',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <h2 className="mb-2">
          {categoryFilter === 'All' ? 'Latest Products' : categoryFilter}
          <span style={{ fontSize: '0.9rem', fontWeight: '400', color: 'var(--light-text)', marginLeft: '10px' }}>
            ({filteredProducts.length} items)
          </span>
        </h2>

        {loading && <div className="loading">Loading products...</div>}
        {error && <div className="error-msg">{error}</div>}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center mt-2" style={{ padding: '40px' }}>
            <p style={{ fontSize: '2rem' }}>🔍</p>
            <p style={{ color: 'var(--light-text)' }}>No products found. Try a different search or category.</p>
          </div>
        )}

        <div className="product-grid">
          {filteredProducts.map(p => (
            <div className="product-card" key={p._id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                onClick={() => navigate(`/product/${p._id}`)} 
                style={{ cursor: 'pointer', flex: 1 }} 
                title="Click to view full details"
              >
                <img
                  src={p.images && p.images.length > 0 ? p.images[0] : 'https://placehold.co/600x400?text=Student+Marketplace'}
                  alt={p.title}
                  className="product-image"
                />
                <div className="product-details" style={{ paddingBottom: '0' }}>
                  {/* Category + Verified Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="product-category">{p.category}</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      {p.status === 'Sold' && (
                        <span style={{
                          fontSize: '0.7rem',
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.5)',
                          color: '#f87171',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}>
                          🔴 SOLD
                        </span>
                      )}
                      {isVerifiedStudent(p.seller) && (
                        <span style={{
                          fontSize: '0.7rem',
                          background: 'rgba(0, 212, 170, 0.15)',
                          border: '1px solid rgba(0, 212, 170, 0.3)',
                          color: 'var(--teal)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}>
                          ✅ Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="product-title">{p.title}</h3>
                  <div className="product-price">₹{p.price}</div>
                  <p className="product-desc">{p.description}</p>

                  {/* Campus Transaction Info */}
                  <div style={{
                    background: 'rgba(0, 245, 255, 0.04)',
                    border: '1px solid rgba(0, 245, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    marginBottom: '10px',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ marginBottom: '4px' }}>
                      <strong>{getPaymentIcon(p.paymentMethod)} Payment:</strong> {p.paymentMethod || 'Cash on Delivery'}
                    </div>
                    {p.meetupLocation && (
                      <div>
                        <strong>📍 Meetup:</strong> {p.meetupLocation}
                      </div>
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="product-seller" style={{ marginBottom: '16px' }}>
                    🧑 {p.seller}
                  </div>
                </div>
              </div>

              {/* Action Buttons Container */}
              <div style={{ padding: '0 20px 20px 20px' }}>
                {/* Contact Buttons (not on own listings) */}
                {p.seller !== myEmail ? (
                  <div className="contact-buttons">
                    {p.status === 'Sold' ? (
                      <button
                        className="btn btn-block"
                        disabled
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-secondary)',
                          cursor: 'not-allowed',
                          marginBottom: '8px'
                        }}
                      >
                        🚫 Item Sold Out
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleChat(p.seller, p.title)}
                          className="btn btn-primary btn-block"
                          style={{ marginBottom: '8px' }}
                        >
                          💬 Message Seller
                        </button>
                      </>
                    )}

                    {/* Report Button */}
                    <button
                      onClick={() => handleReport(p.title)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#b0b0b0',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        padding: '4px 0',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      🚩 Report listing
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <button
                      onClick={() => handleToggleStatus(p._id, p.status)}
                      className="btn btn-block"
                      style={{
                        background: p.status === 'Sold' ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.15), rgba(0, 212, 170, 0.3))' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.3))',
                        border: p.status === 'Sold' ? '1px solid rgba(0, 212, 170, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                        color: p.status === 'Sold' ? 'var(--teal)' : '#fbbf24',
                        padding: '8px 16px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {p.status === 'Sold' ? '🟢 Mark as Available' : '🤝 Mark as Sold'}
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(p._id, p.title)}
                      className="btn btn-block"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.3))',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        padding: '8px 16px',
                        fontSize: '0.85rem'
                      }}
                    >
                      🗑️ Delete Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
