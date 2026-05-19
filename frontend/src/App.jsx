import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Chat from './pages/Chat';
import Inbox from './pages/Inbox';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-logo">
          <Link to="/">Student Marketplace</Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {token ? (
            <>
              <Link to="/sell" className="nav-link">Sell Product</Link>
              <Link to="/inbox" className="nav-link">📬 Messages</Link>
              <button onClick={handleLogout} className="btn nav-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn nav-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Built for University Students | Student Marketplace &copy; 2026</p>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/chat/:sellerEmail/:productTitle" element={<Chat />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
