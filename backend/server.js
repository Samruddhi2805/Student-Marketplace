require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Models & Middleware
const User = require('./models/User');
const Product = require('./models/Product');
const Message = require('./models/Message');
const auth = require('./middleware/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// =======================
// AUTH ROUTES
// =======================

// POST /register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      email: user.email,
      name: user.name
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// PRODUCT ROUTES
// =======================

// POST /product (Protected)
app.post('/product', auth, upload.array('images', 5), async (req, res) => {
  try {
    console.log("=== API LOG: UPLOAD RECEIVED ===");
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);

    const { title, price, description, category, paymentMethod, meetupLocation } = req.body;
    
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
    } else {
      imageUrls = ['https://placehold.co/600x400?text=Student+Marketplace+Item'];
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      images: imageUrls,
      seller: req.user.email,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      meetupLocation: meetupLocation || ''
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /products (Public)
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /product/:id (Public)
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /my-products (Protected)
app.get('/my-products', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.email }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /product/:id (Protected)
app.delete('/product/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.seller !== req.user.email) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /product/:id/status (Protected)
app.patch('/product/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Available', 'Sold'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.seller !== req.user.email) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    product.status = status;
    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// =======================
// MESSAGE ROUTES
// =======================

// POST /message (Protected) - Send a message
app.post('/message', auth, async (req, res) => {
  try {
    const { receiver, productId, message } = req.body;

    const newMessage = new Message({
      sender: req.user.email,
      receiver,
      productId: productId || '',
      message
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /messages/:otherEmail (Protected) - Get chat history with a specific user
app.get('/messages/:otherEmail', auth, async (req, res) => {
  try {
    const { otherEmail } = req.params;
    const myEmail = req.user.email;

    const messages = await Message.find({
      $or: [
        { sender: myEmail, receiver: otherEmail },
        { sender: otherEmail, receiver: myEmail }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /conversations (Protected) - Get all unique conversations for logged-in user
app.get('/conversations', auth, async (req, res) => {
  try {
    const myEmail = req.user.email;

    // Find all messages where I am sender OR receiver
    const messages = await Message.find({
      $or: [{ sender: myEmail }, { receiver: myEmail }]
    }).sort({ timestamp: -1 });

    // Build a map of unique conversations (keyed by the OTHER person's email)
    const conversationMap = {};
    messages.forEach(msg => {
      const otherEmail = msg.sender === myEmail ? msg.receiver : msg.sender;
      if (!conversationMap[otherEmail]) {
        conversationMap[otherEmail] = {
          otherEmail,
          lastMessage: msg.message,
          lastTime: msg.timestamp,
          productId: msg.productId
        };
      }
    });

    res.json(Object.values(conversationMap));
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

