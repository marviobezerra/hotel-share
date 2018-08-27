const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  stars: Number,
  rating: Number,
  images: [String],
  description: String,
  location: {
    lat: Number,
    long: Number,
  },
  price: Number,
  listings: [mongoose.Schema.ObjectId],
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
