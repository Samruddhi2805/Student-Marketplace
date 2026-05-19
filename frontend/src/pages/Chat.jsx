import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function Chat() {
  const { sellerEmail, productTitle } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  // Get logged in user email from token
  const token = localStorage.getItem('token');
  if (!token) { navigate('/login'); }
  const myEmail = JSON.parse(atob(token.split('.')[1])).email;

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/messages/${sellerEmail}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [sellerEmail]);

  useEffect(() => {
    // Auto scroll to bottom
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);

    try {
      const res = await API.post('/message', {
        receiver: sellerEmail,
        productId: productTitle,
        message: newMessage
      });
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px', padding: '20px' }}>
      {/* Chat Header */}
      <div className="chat-header">
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '6px 14px', marginBottom: '16px' }}>
          ← Back
        </button>
        <div className="chat-header-info">
          <h2>💬 Chat with Seller</h2>
          <p style={{ color: 'var(--light-text)' }}>{sellerEmail}</p>
          {productTitle && (
            <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>
              Re: {decodeURIComponent(productTitle)}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {loading && <p className="text-center" style={{ color: 'var(--light-text)' }}>Loading messages...</p>}
        {!loading && messages.length === 0 && (
          <p className="text-center" style={{ color: 'var(--light-text)', marginTop: '20px' }}>
            No messages yet. Say hi! 👋
          </p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender === myEmail ? 'chat-bubble-me' : 'chat-bubble-them'}`}>
            <p>{msg.message}</p>
            <span className="chat-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="chat-input-row">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" disabled={sending || !newMessage.trim()}>
          {sending ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chat;
