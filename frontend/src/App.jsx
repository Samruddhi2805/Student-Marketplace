import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Chat from './pages/Chat';
import Inbox from './pages/Inbox';
import ProductDetail from './pages/ProductDetail';
import API from './api';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [msgCount, setMsgCount] = React.useState(0);

  React.useEffect(() => {
    if (!token) {
      setMsgCount(0);
      return;
    }

    const fetchMsgCount = async () => {
      try {
        const res = await API.get('/unread-count');
        setMsgCount(res.data.count);
      } catch (err) {
        console.error('Error fetching message count', err);
      }
    };

    fetchMsgCount();

    // Check every 10 seconds for new messages
    const interval = setInterval(fetchMsgCount, 10000);
    return () => clearInterval(interval);
  }, [token, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMsgCount(0);
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
              <Link to="/inbox" className="nav-link">📬 Messages{msgCount > 0 ? ` (${msgCount})` : ''}</Link>
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
