const router = require('express').Router();

module.exports = (City, Hotel) => {

  router.get('/cities', (req, res) => {
    City.find()
    .then((cities) => res.json({success: true, cities}))
    .catch(() => res.json({success: false}));
  });

  router.get('/hotels/', (req, res) => {
    Hotel.find()
    .then((hotels) => res.json({success: true, hotels}))
    .catch(() => res.json({success: false}));
  });

  return router;
}
