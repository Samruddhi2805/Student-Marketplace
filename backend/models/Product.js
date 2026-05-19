const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Books', 'Electronics', 'Hostel Essentials', 'Cycles', 'Notes', 'Lab Equipment', 'Calculators & Drafting', 'Sports & Fitness', 'Musical Instruments']
  },
  images: { type: [String], default: [] }, // Multi-image support
  seller: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'UPI on Meetup', 'Meetup Payment'],
    default: 'Cash on Delivery'
  },
  meetupLocation: { type: String, default: '' }, // e.g. Library, Hostel Gate, Cafeteria
  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
