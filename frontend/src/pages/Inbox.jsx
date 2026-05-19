import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Inbox() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Route protection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await API.get('/conversations');
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations', err);
    } finally {
      setLoading(false);
    }
  };

  const openChat = (conv) => {
    navigate(`/chat/${encodeURIComponent(conv.otherEmail)}/${encodeURIComponent(conv.productId || 'item')}`);
  };

  return (
    <div className="container" style={{ maxWidth: '700px', padding: '30px 20px' }}>
      <h2 style={{ marginBottom: '20px' }}>💬 My Messages</h2>

      {loading && <div className="loading">Loading conversations...</div>}

      {!loading && conversations.length === 0 && (
        <div style={{
          background: 'rgba(6, 14, 38, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,245,255,0.1)',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '3rem', marginBottom: '10px' }}>📭</p>
          <p>No messages yet.</p>
          <p style={{ fontSize: '0.9rem' }}>When someone messages you or you contact a seller, your chats will appear here.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {conversations.map((conv, idx) => (
          <div
            key={idx}
            onClick={() => openChat(conv)}
            style={{
              background: 'rgba(6, 14, 38, 0.75)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,245,255,0.1)',
              borderRadius: '12px',
              padding: '16px 20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
              borderLeft: '3px solid rgba(0,245,255,0.4)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--primary-color)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              {conv.otherEmail[0].toUpperCase()}
            </div>

            {/* Info */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{conv.otherEmail}</div>
              {conv.productId && conv.productId !== 'item' && (
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', marginBottom: '4px' }}>
                  Re: {conv.productId}
                </div>
              )}
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--light-text)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {conv.lastMessage}
              </div>
            </div>

            {/* Time */}
            <div style={{ fontSize: '0.75rem', color: 'var(--light-text)', flexShrink: 0 }}>
              {new Date(conv.lastTime).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inbox;
