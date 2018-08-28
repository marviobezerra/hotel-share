const router = require('express').Router();
const crypto = require('crypto');

function hashPassword(password) {
  let hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

module.exports = (passport, User, City) => {

  router.get('/cities', (req, res) => {
    City.find()
    .then((cities) => res.json({success: true, cities}))
    .catch(() => res.json({success: false}));
  });

  router.post('/login', (req, res, next) => {
    req.body.password = hashPassword(req.body.password);
    passport.authenticate('local', (err, user) => {
      if (err) return res.json({success: false});
      if (!user) return res.json({success: false});
      req.logIn(user, (err) => {
        if (err) return res.json({success: false});
        return res.json({success: true});
      });
    })(req, res, next);
  });

  router.post('/register', (req, res) => {
    console.log(req.body);
    (new User({
      name: {fname: req.body.fname, lname: req.body.lname},
      email: req.body.email,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
      birthday: req.body.birthday,
      gender: req.body.gender,
    }))
    .save().then(() => res.json({success: true}))
    .catch((err) => res.json({success: false}));
  });

  router.use((req, res, next) => {
    if (req.user) next();
    else res.json({success: false});
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.json({success: true});
  });

  return router;
};
