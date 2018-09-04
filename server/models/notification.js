const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Message', 'Request', 'Accept', 'Reject', 'Cancel', 'Other'],
    required: true,
  },
  data: {
    type: String,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
