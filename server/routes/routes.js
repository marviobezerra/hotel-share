const router = require('express').Router();

module.exports = (City) => {

  router.get('/cities', (req, res) => {
    City.find()
    .then((cities) => res.json({success: true, cities}))
    .catch(() => res.json({success: false}));
  });

  return router;
}
