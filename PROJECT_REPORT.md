# Student Marketplace - Cyber-Neon Campus Marketplace
### *A Peer-to-Peer Academic & Lifestyle Transaction Ecosystem*
---

## 1. Executive Summary & Problem Statement
In traditional universities, students frequently trade academic materials (notes, reference books, lab instruments) and hostel utilities (study lamps, space organizers, sports gear) during semester breaks or graduation transitions. 

However, generic ecommerce platforms like eBay or OLX are highly vulnerable to fraud, lack localized student verification, and involve complex online payment gateways.

**Student Marketplace** is a localized peer-to-peer marketplace designed specifically for college campuses. It combines a premium Web3/Fintech-inspired cyber-neon aesthetic with a realistic, fraud-resistant **offline Meetup & Cash-on-Delivery transaction model**, avoiding redundant payment gateways while providing verified academic and peer trust.

---

## 2. Technology Stack & System Architecture
The platform is built on the secure and highly scalable **MERN (MongoDB, Express.js, React, Node.js)** stack:

* **Frontend**: React (Vite-powered Single Page Application), Vanilla CSS (glassmorphism tokens), React Router.
* **Backend**: Node.js & Express.js REST APIs, JWT (JSON Web Tokens) Authentication Middleware.
* **Database**: MongoDB (Local instance) via Mongoose Object Data Modeling (ODM).
* **Asset Uploads**: Multer multi-disk storage processor (supports up to 5 concurrent images per product).

---

## 3. Database Schema Design (Mongoose Models)

### A. User Schema (`backend/models/User.js`)
Stores authenticated user profiles.
```javascript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
```

### B. Product Schema (`backend/models/Product.js`)
Supports physical transactions, multi-images, status indicators, and custom location fallbacks.
```javascript
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Books', 'Electronics', 'Hostel Essentials', 'Cycles', 'Notes', 'Lab Equipment', 'Calculators & Drafting', 'Sports & Fitness', 'Musical Instruments']
  },
  images: { type: [String], default: [] }, // Multi-photo array
  seller: { type: String, required: true },
  sellerPhone: { type: String, default: '' },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'UPI on Meetup', 'Meetup Payment'],
    default: 'Cash on Delivery'
  },
  meetupLocation: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  },
  createdAt: { type: Date, default: Date.now }
});
```

### C. Message Schema (`backend/models/Message.js`)
Persists private communication channels between peers.
```javascript
const MessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
```

---

## 4. Key Engineering Features

### 🤝 A. The Campus Trust & Offline Meetup Model
* **Verified Student Badges**: Incoming user email addresses are parsed. Users possessing institutional edu/college domains automatically unlock a `✅ Verified Student` badge.
* **No Online Gateway Risk**: Transaction friction and payment gateway fees/failures are eliminated. The marketplace is optimized for local face-to-face meetups on campus (e.g. *Library*, *Hostel Gate*, *Block A*).
* **Manual Location Input**: When list options do not suffice, selecting "Other" triggers a dynamic manual text input field so sellers can designate highly specific meetups (e.g. *Biotech Lab 302*).

### 💬 B. Complete Communication Channels
* **In-App Messaging Center**: Full-duplex messaging interface with automated last-message indexings in a private `/inbox` folder.
* **WhatsApp Deep Links**: Auto-populates conversational text specifying product interest, instantly linking buyers and sellers.

### 🖼️ C. Tactical Multi-Photo Carousel Gallery
* Allows sellers to upload up to 5 concurrent images per product.
* The frontend renders a premium tactile details page featuring active focus image modules and miniature interactive clickable thumbnails.

### 🛡️ D. Self-Contained Integrity Controls
* Sellers retain complete administrative rights to **Mark as Sold** or **Delete Listing** right from the cards.
* Sold products dynamically disable contact controls for potential buyers, rendering a clear `🚫 Item Sold Out` marker.

---

## 5. API Reference Guide

### 🔑 Authentication Routes
* `POST /register`: Registers a user. Body: `{ name, email, password, phone }`
* `POST /login`: Log in a user. Returns a signed JWT payload.

### 📦 Product CRUD Routes
* `GET /products`: Retrieve all active listings.
* `GET /product/:id`: Retrieve single product with full gallery.
* `POST /product` (Protected): Upload new listing. Supports `images` array via multipart form uploads.
* `PATCH /product/:id/status` (Protected): Toggles listing status between `'Available'` and `'Sold'`.
* `DELETE /product/:id` (Protected): Permanently deletes listing.

### 📬 Message Center Routes
* `POST /message` (Protected): Dispatches a chat message.
* `GET /messages/:userEmail` (Protected): Pulls conversation logs.
* `GET /conversations` (Protected): Pulls distinct user pairs with active chats.

---

## 6. How to Set Up and Run

### Prerequisites
* **Node.js** installed on system.
* **MongoDB** service running locally.

### Start the Server (Backend)
1. Navigate to `/backend`.
2. Ensure your `.env` contains your `MONGO_URI` and `JWT_SECRET`.
3. Execute:
   ```bash
   npm install
   npm run dev
   ```

### Start the Client (Frontend)
1. Navigate to `/frontend`.
2. Execute:
   ```bash
   npm install
   npm run dev
   ```
3. Open browser to `http://localhost:5173`.

---

## 7. Examiner / Viva Defense Q&A

**Q1: Why did you not implement Stripe, Razorpay, or credit card checkouts?**
> *Answer*: Online payment gateways are high-friction and high-fee for simple peer trades between roommates. By adopting a "COD / UPI on Meetup" system, we reflect the exact real-world mechanism of university students trading offline inside hostel gates. This eliminates fraud since transaction fulfillment and inspection happen simultaneously.

**Q2: What is the significance of the "Verified Student" badge?**
> *Answer*: It provides instant structural verification. It screens out free accounts (like Gmail or Yahoo) and highlights institutional college-issued domains, guaranteeing users that the trader is indeed an active campus student.

**Q3: How do you handle file uploads?**
> *Answer*: We use Node's `multer` library, configured to accept up to 5 concurrent images. If the directory `backend/uploads/` is missing on a clean setup machine, the server dynamically checks and self-generates the directory at startup to avoid program crashes.
