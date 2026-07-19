import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function isVerifiedStudent(email) {
  if (!email) return false;
  const domain = email.split('@')[1] || '';
  const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
  return !freeProviders.includes(domain.toLowerCase());
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const token = localStorage.getItem('token');
  const myEmail = token ? JSON.parse(atob(token.split('.')[1])).email : null;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await API.get(`/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to load product details. It might have been deleted.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

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
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await API.delete(`/product/${id}`);
      alert('Listing deleted successfully!');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || 'Failed to delete listing.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Sold' ? 'Available' : 'Sold';
    try {
      const res = await API.patch(`/product/${id}/status`, { status: nextStatus });
      setProduct(prev => ({ ...prev, status: res.data.status }));
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

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="loading">Loading full details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="error-msg" style={{ maxWidth: '500px', margin: '0 auto' }}>{error}</div>
        <button onClick={() => navigate('/home')} className="btn btn-secondary mt-2">
          ⬅ Back to Home
        </button>
      </div>
    );
  }

  if (!product) return null;

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://placehold.co/600x400?text=Student+Marketplace'];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/home')} 
        style={{
          background: 'rgba(2, 8, 20, 0.6)',
          border: '1px solid rgba(0, 245, 255, 0.2)',
          color: 'var(--cyan)',
          padding: '10px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '600',
          fontSize: '0.88rem',
          marginBottom: '24px',
          transition: 'all 0.2s',
          boxShadow: '0 0 10px rgba(0, 245, 255, 0.05)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.05)';
        }}
      >
        ⬅ Back to Products
      </button>

      {/* Main Details Card */}
      <div style={{
        background: 'rgba(6, 14, 38, 0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 245, 255, 0.08)',
        borderRadius: '24px',
        padding: '30px',
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
        gap: '40px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
      }} className="detail-container">
        
        {/* Left Side: Photo Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Active Image display */}
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)',
            overflow: 'hidden',
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <img 
              src={productImages[activeImageIndex]} 
              alt={product.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxHeight: '450px'
              }}
            />
            {product.status === 'Sold' && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--red)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontWeight: '800',
                fontSize: '0.8rem',
                boxShadow: '0 0 20px var(--red)'
              }}>
                🔴 SOLD OUT
              </div>
            )}
          </div>

          {/* Thumbnails row */}
          {productImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '70px',
                    height: '55px',
                    borderRadius: '8px',
                    border: activeImageIndex === idx ? '2px solid var(--cyan)' : '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s',
                    boxShadow: activeImageIndex === idx ? '0 0 10px rgba(0, 245, 255, 0.4)' : 'none',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Purchase controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="product-category" style={{ fontSize: '0.85rem' }}>{product.category}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {isVerifiedStudent(product.seller) && (
                  <span style={{
                    fontSize: '0.75rem',
                    background: 'rgba(0, 212, 170, 0.15)',
                    border: '1px solid rgba(0, 212, 170, 0.3)',
                    color: 'var(--teal)',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    ✅ Verified Student
                  </span>
                )}
              </div>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', color: '#fff', letterSpacing: '-0.5px' }}>
              {product.title}
            </h1>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--cyan)', marginBottom: '20px' }}>
              ₹{product.price}
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

            {/* Description */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Description</h3>
              <p style={{ color: '#d0d4e3', fontSize: '0.96rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {product.description}
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

            {/* Meetup Details Box */}
            <div style={{
              background: 'rgba(0, 245, 255, 0.03)',
              border: '1px solid rgba(0, 245, 255, 0.12)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <h4 style={{ color: 'var(--cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                🏫 Campus Transaction Details
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>PAYMENT METHOD</div>
                  <div style={{ fontSize: '0.92rem', color: '#fff', fontWeight: '600' }}>
                    {getPaymentIcon(product.paymentMethod)} {product.paymentMethod || 'Cash on Delivery'}
                  </div>
                </div>
                {product.meetupLocation && (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>MEETUP LOCATION</div>
                    <div style={{ fontSize: '0.92rem', color: '#fff', fontWeight: '600' }}>
                      📍 {product.meetupLocation}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Seller Contact Info */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '1.5rem' }}>🧑‍🎓</div>
              <div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>SELLER</div>
                <div style={{ fontSize: '0.94rem', color: '#fff', fontWeight: '600' }}>{product.seller}</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div>
            {product.seller !== myEmail ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.status === 'Sold' ? (
                  <button
                    className="btn btn-block"
                    disabled
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-secondary)',
                      cursor: 'not-allowed',
                      padding: '14px',
                      fontSize: '1rem',
                      fontWeight: '700'
                    }}
                  >
                    🚫 This item has been sold out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleChat(product.seller, product.title)}
                      className="btn btn-primary btn-block"
                      style={{ padding: '14px', fontSize: '1rem', fontWeight: '700' }}
                    >
                      💬 Message Seller Internally
                    </button>
                  </>
                )}

                {/* Report button */}
                <button
                  onClick={() => handleReport(product.title)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#b0b0b0',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    padding: '8px 0',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '4px'
                  }}
                >
                  🚩 Report listing to Moderator
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  background: 'rgba(0, 245, 255, 0.03)',
                  border: '1px dashed rgba(0, 245, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '4px'
                }}>
                  👑 You own this listing
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    onClick={() => handleToggleStatus(product._id, product.status)}
                    className="btn btn-block"
                    style={{
                      background: product.status === 'Sold' ? 'linear-gradient(135deg, rgba(0, 212, 170, 0.12), rgba(0, 212, 170, 0.25))' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.25))',
                      border: product.status === 'Sold' ? '1px solid rgba(0, 212, 170, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                      color: product.status === 'Sold' ? 'var(--teal)' : '#fbbf24',
                      padding: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    {product.status === 'Sold' ? '🟢 Mark Available' : '🤝 Mark as Sold'}
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id, product.title)}
                    className="btn btn-block"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(239, 68, 68, 0.25))',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      padding: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    🗑️ Delete Listing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile/Responsive styling overrides inline */}
      <style>{`
        @media (max-width: 768px) {
          .detail-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductDetail;
