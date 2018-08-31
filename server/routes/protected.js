const router = require('express').Router();

module.exports = (User, Hotel, Listing, Request, Booking) => {

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

  router.get('/listings', (req, res) => {
    Listing.find({user: req.user._id})
    .then((listings) => res.json({success: true, listings}))
    .catch(() => res.json({success: false}));
  });

  router.get('/bookingsGuest', (req, res) => {
    Booking.find({guest: req.user._id})
    .then((bookings) => res.json({success: true, bookings}))
    .catch(() => res.json({success: false}));
  });

  router.get('/bookingsHost', (req, res) => {
    Booking.find({host: req.user._id})
    .then((bookings) => res.json({success: true, bookings}))
    .catch(() => res.json({success: false}));
  });

  router.post('/list', (req, res) => {
    let listing = new Listing({
      user: req.user._id,
      hotel: req.body.hotel,
      guests: req.body.guests,
      from: req.body.from,
      to: req.body.to,
      price: req.body.price,
      booked: false,
    });
    listing.save()
    .then(() => (Hotel.findByIdAndUpdate(req.body.hotel, {$push: {listings: listing._id}})))
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  router.post('/request', (req, res) => {
    (new Request({
      requester: req.user._id,
      listing: req.body.listing,
    })).save()
    .then(() => res.json({success: true}))
    .ctach(() => res.json({success: false}));
  });

  router.post('/accept', (req, res) => {
    Request.findById(req.body._id)
    .populate('listing')
    .then((request) => {
      let booking = new Booking({
        host: req.user._id,
        guest: request.requester,
        hotel: request.listing.hotel,
        guests: request.listing.guests,
        from: request.listing.from,
        to: request.listing.to,
        price: request.listing.price,
      });
      request.find({listing: request.listing}).remove();
      request.listing.remove();
      return booking.save();
    })
    .then(() => res.json({success: true}))
    .catch(() => res.json({success: false}));
  });

  return router;
}
