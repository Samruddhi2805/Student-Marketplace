# Student Marketplace - Cyber-Neon Campus Marketplace

**Student Marketplace** is a localized peer-to-peer marketplace designed specifically for college campuses. It combines a premium Web3/Fintech-inspired cyber-neon aesthetic with a realistic, fraud-resistant **offline Meetup & Cash-on-Delivery transaction model**, avoiding redundant payment gateways while providing verified academic and peer trust.

---

## 🌟 Key Features

* **🤝 Verified Student Badges:** Screens out free accounts and highlights institutional college-issued domains to guarantee traders are active campus students.
* **🚫 No Online Gateway Risk:** Eliminates transaction friction and payment gateway fees. Optimized for local face-to-face meetups on campus.
* **💬 In-App Messaging Center:** Full-duplex messaging interface with automated last-message indexings.
* **🖼️ Tactical Multi-Photo Gallery:** Sellers can upload up to 5 concurrent images per product.
* **🛡️ Integrity Controls:** Sellers retain complete administrative rights to mark items as Sold or Delete listings directly from the platform.

---

## 🛠️ Technology Stack

The platform is built on the secure and highly scalable **MERN** stack:

* **Frontend:** React (Vite-powered SPA), Vanilla CSS (glassmorphism tokens), React Router.
* **Backend:** Node.js & Express.js REST APIs, JWT Authentication Middleware.
* **Database:** MongoDB (Local/Cloud instance) via Mongoose.
* **File Handling:** Multer multi-disk storage processor.

---

## 🚀 How to Set Up and Run

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your system.
* [MongoDB](https://www.mongodb.com/try/download/community) service running locally.

### 1. Start the Backend Server
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create a `.env` file):
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/student-marketplace
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Start the Frontend Client
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`.


