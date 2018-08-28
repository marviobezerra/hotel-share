const router = require('express').Router();

module.exports = (City) => {
  router.get('/cities', (req, res) => {
    City.find({})
    .then((cities) => res.json({success: true, cities}))
    .catch((err) => {res.json({success: false, err: err}); console.log(err)});
  });

  return router;
}
