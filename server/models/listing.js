const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
