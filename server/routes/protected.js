const router = require('express').Router();
const stripe = require('stripe')(process.env.SECRET_KEY);

const Request = require('../models/request');
const Booking = require('../models/booking');
const Payment = require('../models/payment');
const Message = require('../models/message');
const Notification = require('../models/notification');

module.exports = (User, Hotel, Listing) => {

  router.get('/account', (req, res) => {
    User.findById(req.user._id)
    .then((user) => res.json({success: true, user}))
    .catch(() => res.json({success: false}));
  });

  router.post('/account', (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$set: req.body})
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.get('/notifications', (req, res) => {
    Notification.find({user: req.user._id})
    .then((notifications) => res.json({success: true, notifications}))
    .catch(() => res.json({success: false}));
  });

  router.post('/readNotification', (req, res) => {
    Notification.findByIdAndUpdate(req.body.notification, {$set: {read: true}})
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.get('/messages', (req, res) => {
    Message.find({$or: [{to: req.user._id}, {from: req.user._id}]})
    .populate({path: 'from to', select: 'name imgUrl'})
    .sort({timestamp: -1})
    .then((messages) => res.json({success: true, messages}))
    .catch(() => res.json({success: false}));
  });

  router.post('/message', (req, res) => {
    (new Message({
      from: req.user._id,
      to: req.body.to,
      content: req.body.content,
      timestamp: new Date(),
    })).save()
    .then(() => (
      (new Notification({
        user: req.body.to,
        message: `You have a new message from ${req.user.name.fname}!`,
        category: 'Message',
        data: req.user._id,
        timestamp: new Date(),
      })).save()))
    .then(() => res.json({success: true}))
    .catch((err) => res.json({success: false, err}));
  });

  router.get('/listings', (req, res) => {
    Listing.find({user: req.user._id})
    .then((listings) => res.json({success: true, listings}))
    .catch(() => res.json({success: false}));
  });

  router.get('/bookingsGuest', (req, res) => {
    Booking.find({guest: req.user._id})
    .populate([{path: 'hotel', select: 'city name images description location'}, {path: 'host guest', select: 'name imgUrl'}])
    .then((bookings) => res.json({success: true, bookings}))
    .catch(() => res.json({success: false}));
  });

  router.get('/bookingsHost', (req, res) => {
    Booking.find({host: req.user._id})
    .populate([{path: 'hotel', select: 'city name images description location'}, {path: 'host guest', select: 'name imgUrl'}])
    .then((bookings) => res.json({success: true, bookings}))
    .catch(() => res.json({success: false}));
  });

  router.post('/list', (req, res) => {
    let listing = new Listing({
      user: req.user._id,
      hotel: req.body.hotel,
      room: req.body.room,
      guests: req.body.guests,
      from: req.body.from,
      to: req.body.to,
      price: req.body.price,
    });
    listing.save()
    .then(() => (Hotel.findByIdAndUpdate(req.body.hotel, {$push: {listings: listing._id}})))
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.post('/unlist', (req, res) => {
    Listing.findById(req.body.listing)
    .then((listing) => {
      listing.remove();
      return Request.find({listing: listing._id});
    })
    .then((requests) => Promise.all(
      requests.map((request) => {
        (new Notification({
          user: request.requester,
          message: `Your request to ${req.user.name.fname} was canceled because the listing was removed from our site!`,
          category: 'Reject',
          timestamp: new Date(),
        })).save();
        return request.remove();
      })
    ))
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.post('/request', (req, res) => {
    (new Request({
      requester: req.user._id,
      listing: req.body.listing,
    })).save()
    .then(() => (Listing.findById(req.body.listing)))
    .then((listing) => (
      (new Notification({
        user: listing.user,
        message: `${req.user.name.fname} sent you a booking request!`,
        category: 'Request',
        data: listing._id,
        timestamp: new Date(),
      })).save()))
    .then(() => res.json({success: true}))
    .ctach(() => res.json({success: false}));
  });

  router.post('/accept', (req, res) => {
    Request.findById(req.body.request)
    .populate('listing')
    .then((request) => {
      (new Booking({
        host: req.user._id,
        guest: request.requester,
        hotel: request.listing.hotel,
        room: request.listing.room,
        guests: request.listing.guests,
        from: request.listing.from,
        to: request.listing.to,
        price: request.listing.price,
      })).save()
      .then(() => (
        (new Notification({
          user: request.requester,
          message: `${req.user.name.fname} accepted your booking request!`,
          category: 'Accept',
          timestamp: new Date(),
        })).save()))
      .then(() => (request.find({listing: request.listing})))
      .then((requests) => Promise.all(
        requests.map((request) => {
          (new Notification({
            user: request.requester,
            message: `Your request to ${request.listing.user.name.fname} was canceled because this listing is no longer available!`,
            category: 'Reject',
            timestamp: new Date(),
          })).save();
          return request.remove();
        })
      ));
      return request.listing.remove();
    })
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.post('/reject', (req, res) => {
    Request.findById(req.body.request)
    .then((request) => {
      (new Notification({
        user: request.requester,
        message: `${req.user.name.fname} rejected your booking request!`,
        category: 'Reject',
        data: request.listing,
        timestamp: new Date(),
      })).save();
      return request.remove();
    })
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.post('/book', (req, res) => {
    stripe.customers.create({
      email: req.body.email,
      source: req.body.stripeToken,
    })
    .then((customer) => (
      (new Payment({
        _user: req.user._id,
        _listing: req.body.listing,
        stripeCustomerId: req.body.stripeCustomerId,
        stripeExpMonth: req.body.stripeExpMonth,
        stripeExpYear: req.body.stripeExpYear,
        stripeLast4: req.body.stripeLast4,
        stripeSource: req.body.stripeSource,
        status: req.body.status,
      })).save()
      .then(() => (
        stripe.charges.create({
          amount: req.session.price,
          currency: 'usd',
          customer: customer.id,
        })))
      .then(() => res.json({success: true}))
      .catch(() => res.json({success: false}))
    ))
    .catch(() => res.json({success: false}));
  });

  return router;
}
