# SAVITRIBAI PHULE PUNE UNIVERSITY 
  
 
A Project Report On 
**Student Marketplace - Cyber-Neon Campus Marketplace** 
Submitted Towards The 
Partial Fulfillment Of The Requirements Of 
[Your Degree/Course Name]  Submitted By 
 
[Your Name] (Roll no:[Your Roll No]) 
 
 
Under The Guidance of 
[Your Guide's Name] 
 
  
 
Accepted By 
Department of Technology 
 
 
 
 
Savitribai Phule Pune University, Pune 
 
---
 
## Abstract 
The project Student Marketplace is a localized peer-to-peer marketplace designed specifically for college campuses. In traditional universities, students frequently trade academic materials (notes, reference books, lab instruments) and hostel utilities. However, generic ecommerce platforms like eBay or OLX are highly vulnerable to fraud, lack localized student verification, and involve complex online payment gateways.

Student Marketplace introduces a premium Web3/Fintech-inspired cyber-neon aesthetic with a realistic, fraud-resistant offline Meetup & Cash-on-Delivery transaction model. The architecture is built on the secure and highly scalable MERN (MongoDB, Express.js, React, Node.js) stack. It incorporates verified student badges, a tactical multi-photo carousel gallery, and an in-app messaging center for seamless peer-to-peer communication. 

By eliminating redundant payment gateways and focusing on local face-to-face meetups on campus, Student Marketplace provides verified academic trust and ensures smooth, fraud-free transactions among students.
  
 
---
  	  
## Acknowledgment  
I would like to express my deepest gratitude to my guide and mentor for their continuous support, motivation, and expert guidance throughout this project. Their profound insights were invaluable to the successful conception and completion of Student Marketplace.  
I am also sincerely thankful to my department and college faculty for providing all the necessary resources and encouragement during the development phase.  
— [Your Name]  

---

## Contents 
 
CHAPTER NO.1: Title Page
CHAPTER NO.2: Project Overview Page
CHAPTER NO.3: Technical Keywords Page
CHAPTER NO.4: Introduction Page
CHAPTER NO.5: Problem Definition & Scope Page
CHAPTER NO.6: Software Requirement Specification (SRS) Page 
CHAPTER NO.7: Design Document Page
CHAPTER NO.8: Testing Page
CHAPTER NO.9: Screenshots Page
CHAPTER NO.10: Challenges & Solutions Page
CHAPTER NO.11: Risk & Mitigation Page
CHAPTER NO.12: Glossary Page
CHAPTER NO.13: Conclusion Page
CHAPTER NO.14: References Page

---

## CHAPTER NO.1: Title Page 
 
### 1.1 Project Title   
Student Marketplace - Cyber-Neon Campus Marketplace
 
### 1.2 Group Member Names & Roll Numbers 
[Your Name]  
RollNo: [Your Roll No]

---
 
## CHAPTER NO.2: Project Overview 
 
### 2.1 PROBLEM STATEMENT 
In traditional universities, students frequently trade academic materials (notes, reference books, lab instruments) and hostel utilities (study lamps, space organizers, sports gear) during semester breaks or graduation transitions. 
However, this process faces critical issues:
- Fraud Vulnerability: Generic ecommerce platforms like eBay or OLX are highly vulnerable to fraud.
- Lack of Localized Trust: There is no localized student verification to ensure the person you are trading with is actually a peer on campus.
- Complex Payment Gateways: Existing platforms involve complex online payment gateways that add friction and fees to simple peer trades.
 
### 2.2 OBJECTIVES 
- Peer-to-Peer Academic Ecosystem: To create a localized marketplace tailored specifically for college campuses.
- Fraud-Resistant Transactions: To implement an offline Meetup & Cash-on-Delivery model that avoids redundant payment gateways.
- Student Verification: To provide institutional verification (Verified Student badges) for incoming users.
- Seamless Communication: To facilitate communication between buyers and sellers via an in-app messaging center and WhatsApp deep links.
 
### 2.3 PROJECT SUMMARY 
Student Marketplace is a localized peer-to-peer marketplace built on the MERN stack (MongoDB, Express.js, React, Node.js). It provides a secure, verified environment for college students to trade academic and lifestyle items. The platform utilizes a premium cyber-neon aesthetic and focuses on a realistic offline Meetup transaction model to eliminate online payment risks. With features like dynamic multi-photo uploads via Multer, JWT-based authentication, and dedicated communication channels, Student Marketplace modernizes the traditional campus bulletin board into a streamlined digital ecosystem.

---
 
## CHAPTER NO.3: Technical Keywords 
 
### 3.1 AREA OF PROJECT 
1. E-Commerce & Marketplace (Primary Area): 
   - Focus: Facilitating peer-to-peer trades for academic materials and utilities.
2. Web Development (Technical Area): 
   - Focus: Building a responsive, high-performance Single Page Application (SPA).
3. Secure Authentication & Verification (Application Area): 
   - Focus: Ensuring only verified students can actively participate securely.
4. Full-Stack Software Infrastructure (Implementation Area): 
   - Focus: Developing a robust MERN stack architecture with RESTful APIs.
 
### 3.2 TECHNICAL KEYWORDS 
1. MERN Stack: MongoDB, Express.js, React, Node.js.
2. JWT (JSON Web Tokens): Used for secure authentication middleware.
3. Multer: Multi-disk storage processor for asset uploads.
4. Single Page Application (SPA): Web application that dynamically rewrites the current web page.
5. RESTful API: Architectural style for the backend endpoints.
6. Glassmorphism: UI design trend utilized in the Vanilla CSS tokens.
7. Verification Badge: Mechanism to parse institutional edu/college domains.
8. Cash-on-Delivery (COD): Offline payment model ensuring fraud-resistant trades.

---
 
## CHAPTER NO.4: Introduction 
 
### 4.1 PROJECT IDEA 
Student Marketplace is a localized peer-to-peer marketplace designed specifically for college campuses. It combines a premium Web3/Fintech-inspired cyber-neon aesthetic with a realistic, fraud-resistant offline Meetup & Cash-on-Delivery transaction model. The project provides an ecosystem for trading academic materials (notes, reference books, lab instruments) and hostel utilities.

Key Features:
- Verified Student Badges based on institutional email parsing.
- Manual and dynamic Meetup Location Input.
- Complete Communication Channels (In-App Messaging & WhatsApp deep links).
- Tactical Multi-Photo Carousel Gallery (up to 5 images per product).
- Self-Contained Integrity Controls for sellers to mark items as Sold or Delete.
 
### 4.2 MOTIVATION OF THE PROJECT 
1. Eliminating Online Gateway Risk: Generic online payment gateways are high-friction and high-fee for simple peer trades between roommates. 
2. Creating Campus Trust: Traditional ecommerce lacks verification. There is a need to guarantee users that the trader is indeed an active campus student.
3. Realistic Student Use Cases: Students often trade face-to-face inside hostel gates. The platform needed to reflect the exact real-world mechanism of university students trading offline.

---
 
## CHAPTER NO.5: Problem Definition & Scope 
 
### 5.1 PROBLEM STATEMENT 
Generic ecommerce platforms are highly vulnerable to fraud, lack localized student verification, and involve complex online payment gateways. For university students who just want to trade a textbook or a study lamp locally, these platforms add unnecessary friction, fees, and safety concerns. There is no dedicated, verified digital ecosystem that caters specifically to the localized, offline nature of campus trades.
 
### 5.2 GOALS AND OBJECTIVES 
1. To Mitigate Fraud: By utilizing an offline Meetup & Cash-on-Delivery model where transaction fulfillment and inspection happen simultaneously.
2. To Ensure Trust: By implementing a Verified Student badge system via email domain parsing.
3. To Streamline Communication: By offering integrated messaging and WhatsApp deep links.
 
### 5.3 STATEMENT OF SCOPE 
The project delivers a fully functional MERN stack web application (Student Marketplace). 
Deliverables: 
1. Frontend: React-based Single Page Application with Vite and Vanilla CSS.
2. Backend: Node.js/Express API server.
3. Database: MongoDB (via Mongoose) to manage Users, Products, and Messages.
4. File Storage: Multer implementation for multi-image product galleries.
 
### 5.4 HARDWARE RESOURCES REQUIRED 

| Hardware Resource | Parameter | Minimum Requirement | Justification |
| :--- | :--- | :--- | :--- |
| Central Processing Unit (CPU) | Speed (GHz) | 2.5 or higher | Handling Node.js backend and React frontend. |
| Random Access Memory (RAM) | Capacity (GB) | 8 or higher | Running local dev environments and MongoDB. |
| Storage | Type | SSD | Faster I/O for database operations and image storage. |
| Internet Connection | Speed (Mbps) | 10 or higher | Reliable connection for API calls. |

### 5.5 SOFTWARE RESOURCES REQUIRED 

| Software Resource | Version |
| :--- | :--- |
| Node.js | 18.x or higher |
| React.js | 18.2.0 or higher |
| Express.js | 4.18.2 or higher |
| MongoDB | Latest stable version |
| Mongoose | Latest stable version |
| Multer | Latest stable version |
| Integrated Development Environment | Visual Studio Code |

---
 
## CHAPTER NO.6: Software Requirement Specification 
 
### 6.1 INTRODUCTION 
Student Marketplace is a localized peer-to-peer marketplace tailored for university campuses. It acts as a digital bulletin board combined with a secure, verified trading platform, facilitating the exchange of academic and lifestyle items without the friction of online payment gateways.
 
### 6.2 PURPOSE & SCOPE OF SRS 
- Purpose: Defines functional and non-functional requirements for Student Marketplace.
- Scope: Supports secure authentication, multi-image product listings, in-app messaging, and status toggling for listings. Excludes online payment processing.
 
### 6.3 RESPONSIBILITIES OF DEVELOPER 
- Develop a scalable MERN stack architecture.
- Implement JWT authentication and email parsing for verification.
- Build a responsive, aesthetically pleasing frontend using Vite and React.
- Ensure efficient multi-image file handling using Multer.
 
### 6.4 USAGE SCENARIO 
A verified student wants to sell an old reference book. They log in, upload the product details along with up to 5 photos, and set the meetup location to "Library". An interested buyer views the tactical multi-photo carousel, uses the in-app messaging center to negotiate, and they meet offline. The seller then marks the item as "Sold" to disable further contact.
 
### 6.5 USER PROFILES TABLE 

| User | Description |
| :--- | :--- |
| Verified Student | User registered with an institutional edu/college domain; can buy and sell. |
| Standard User | User registered with standard email; can buy and sell but lacks the Verified badge. |
| System | Backend server handling API requests and database management. |
 
### 6.6 USE CASES TABLE 

| ID | Use Case | Actor |
| :--- | :--- | :--- |
| UC1 | Register & Authenticate | Student |
| UC2 | Upload Product Listing | Student (Seller) |
| UC3 | Send Message / WhatsApp Link | Student (Buyer) |
| UC4 | Mark Listing as Sold/Delete | Student (Seller) |
 
### 6.7 USE CASE DIAGRAM 
*[Insert Use Case Diagram illustrating Student interacting with Listings and Messaging, and System handling DB and Auth]*
 
### 6.8 DATA DESCRIPTION 
#### 6.8.1 On-Chain / Persistent Data Structures (Mongoose Models)

| Data Entity | Storage Component | Data Fields | Description & Purpose |
| :--- | :--- | :--- | :--- |
| User | UserSchema | name, email, password, phone, createdAt | Stores authenticated user profiles. |
| Product | ProductSchema | title, price, description, category, images, seller, paymentMethod, meetupLocation, status | Supports physical transactions, multi-images, status indicators. |
| Message | MessageSchema | sender, receiver, productId, message, timestamp | Persists private communication channels between peers. |
 
### 6.9 ER Diagram (Entity-Relationship) 
*[Insert ER Diagram]*
 
#### 6.9.1 Relationship Interpretation 

| Relationship | Cardinality | Implementation Logic |
| :--- | :--- | :--- |
| User → Product | One-to-Many (1:N) | One User can list multiple Products. |
| User → Message | One-to-Many (1:N) | A User can send/receive multiple Messages. |
| Product → Message | One-to-Many (1:N) | A Product can have multiple Messages associated with it. |
 
### 6.10 DATA FLOW DIAGRAM (DFD) 
*[Insert DFD Level 0 and Level 1 showing data flow between Frontend, Node.js API, and MongoDB]*

---
 
## CHAPTER NO.7: Design Document Page 
 
### 7.1. System Architecture Diagram 
Student Marketplace utilizes a classic client-server architecture based on the MERN stack.
Key Components: 
- Client Layer (React.js/Vite): Single Page Application serving UI and interacting with users. Uses React Router for navigation.
- Central API (Node.js/Express): Handles HTTP requests, JWT verification, and file uploads via Multer.
- Database (MongoDB): Local/Cloud instance accessed via Mongoose ODM to persist application state.
 
### 7.2. Class Diagram 
*[Insert Class Diagram representing User, Product, and Message classes based on Mongoose schemas]*
 
### 7.3. Component Breakdown 

| Component | Primary Responsibility | Technology |
| :--- | :--- | :--- |
| Auth Middleware | Verifying user JWT tokens | Node.js / jsonwebtoken |
| Image Processor | Handling multi-part file uploads | Express / Multer |
| Messaging Center | Duplex communication UI | React.js |
| Verification Engine | Parsing domains for Verified Badge | Javascript Regex |

---
 
## CHAPTER NO.8: Testing Page 
 
| Test ID | Test Description | Input Data | Expected Data | Actual Data | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | User Registration | Valid email, pass, name | Account created, JWT returned | Account created | Pass |
| 2 | Verified Badge Check | .edu email domain | Badge boolean set to true | Badge set to true | Pass |
| 3 | Product Image Upload | 3 image files (JPEG) | Saved to /uploads directory | Saved successfully | Pass |
| 4 | Product Listing Creation | Title, price, category | Product stored in MongoDB | Stored correctly | Pass |
| 5 | Mark as Sold | PATCH request to /status | Status updated to 'Sold' | Status updated | Pass |
| 6 | Unauthorized Listing Edit | JWT of different user | Access Denied (403) | Access Denied | Pass |
| 7 | Send Chat Message | Valid string message | Message saved to DB | Message saved | Pass |
| 8 | Fetch Conversations | GET request to inbox | List of active chats returned | List returned | Pass |
| 9 | Directory Auto-Generate | Server startup (no /uploads) | /uploads directory created | Directory created | Pass |
| 10 | WhatsApp Deep Link | Click on contact button | WhatsApp URL with pre-filled text | URL generated | Pass |

---
 
## CHAPTER NO.9: Screenshots Page 
 
*[Insert relevant screenshots of the Application]*
- Figure 9.1: Login/Registration Page
- Figure 9.2: Main Marketplace Dashboard with Cyber-Neon Aesthetic
- Figure 9.3: Product Detail Page with Multi-Photo Carousel
- Figure 9.4: In-App Messaging Center
- Figure 9.5: Manual Meetup Location Input form
- Figure 9.6: "Item Sold Out" marker view

---
 
## CHAPTER NO.10: Challenges & Solutions Page 
 
**Challenge 1: Payment Gateway Friction & Fraud**
- **Issue**: Integrating online payments introduced high fees and potential fraud for simple peer-to-peer campus trades.
- **Solution**: Adopted a "COD / UPI on Meetup" system. This reflects the real-world mechanism of university students trading offline. It eliminates fraud since transaction fulfillment and inspection happen simultaneously face-to-face.

**Challenge 2: Establishing Trust Among Users**
- **Issue**: Standard email accounts do not verify if a user actually belongs to the campus.
- **Solution**: Developed a "Verified Student" badge mechanism. The system parses incoming email addresses, and if they possess institutional edu/college domains, they automatically unlock the verification badge.

**Challenge 3: Handling Multi-Image Uploads Robustly**
- **Issue**: Allowing users to upload multiple images can crash the backend if the designated upload folder is missing.
- **Solution**: Implemented `multer` for concurrent uploads (up to 5). Added a server startup script that dynamically checks and self-generates the `backend/uploads/` directory to avoid program crashes on clean setups.

---
 
## CHAPTER NO.11: Risk & Mitigation Page 
 
### 11.1 Project Risks 
**Risk 1: Inappropriate Content Uploads**
- Description: Users might upload irrelevant or inappropriate images to the marketplace.
- Mitigation: Users are authenticated, and sellers retain complete administrative rights. An administrative reporting feature can be added in the future.

**Risk 2: Server Storage Overload**
- Description: Allowing up to 5 images per product could quickly consume server storage.
- Mitigation: Multer configuration includes file size limits, and older "Sold" or "Deleted" product images are cleared from the disk.

### 11.2 Security Considerations
**Risk 3: Unauthorized Access to APIs**
- Description: Malicious users might try to alter product statuses or delete listings they do not own.
- Mitigation: Implemented strict JWT Authentication Middleware. Every protected route validates the token and checks if the requesting user ID matches the seller ID before allowing database mutations.

---
 
## CHAPTER NO.12: Glossary Page 
 
- **MERN Stack**: A popular web development framework consisting of MongoDB, Express.js, React, and Node.js.
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties, used for authentication.
- **Multer**: A Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **Single Page Application (SPA)**: A web app that interacts with the user by dynamically rewriting the current web page with new data from the web server.
- **Glassmorphism**: A UI design trend characterized by translucent, frosted-glass-like elements.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Web3/Fintech Aesthetic**: A design philosophy incorporating modern, sleek, neon-driven, and high-tech visual elements.
- **Cash-on-Delivery (COD)**: A transaction model where payment is made at the time of delivery/meetup rather than in advance online.

---
 
## CHAPTER NO.13: Conclusion Page 
 
### 1. What Was Achieved 
The Student Marketplace project successfully addressed the need for a localized, peer-to-peer trading ecosystem tailored for university campuses. 
- Developed a full-stack marketplace using the MERN architecture.
- Replaced risky online payment gateways with a practical, offline Meetup & COD model.
- Implemented a Verified Student badge system via email parsing.
- Built a seamless multi-photo upload system using Multer.
- Integrated robust in-app messaging and WhatsApp deep links for easy communication.

### 2. Improvements Possible 
- Implementation of an image compression algorithm before saving to disk to save server storage.
- Addition of an admin panel for global moderation of listings and users.
- Implementation of a search filtering system (by price, category, etc.) with advanced indexing.

### 3. Future Scope 
- Integration with the university's actual SSO (Single Sign-On) for absolute verification.
- Expanding the marketplace to include a "Services" category (e.g., tutoring, tech repair).
- Creating a cross-platform mobile application using React Native for push notifications and better accessibility.

---

## CHAPTER NO.14: References Page 
 
**Websites & Official Documentation**
[1] React.js Official Documentation. Available: https://react.dev/
[2] Node.js Foundation, Node.js Official Documentation. Available: https://nodejs.org/en/docs
[3] Express.js, Express.js Documentation. Available: https://expressjs.com/
[4] MongoDB & Mongoose Documentation. Available: https://mongoosejs.com/docs/
[5] Multer Middleware Documentation. Available: https://github.com/expressjs/multer
[6] JWT.io, JSON Web Token (JWT) Introduction. Available: https://jwt.io/introduction

**YouTube Tutorials**
[1] MERN Stack E-Commerce Build Tutorials
[2] Node.js File Uploads with Multer
[3] JWT Authentication Explained
