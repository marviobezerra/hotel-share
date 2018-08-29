const router = require('express').Router();

module.exports = (Hotel, Listing) => {

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

  return router;
}
