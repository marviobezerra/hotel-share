const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/search', (req, res) => {
    res.json({success: true, body: req.body});
  });
  return router;
}
