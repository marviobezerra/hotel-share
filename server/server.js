const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const auth = require('./routes/auth');
const routes = require('./routes/routes')
const cities = require('../cityData');
const User = require('./models/user');
const City = require('./models/city');
const cors = require('cors');
app.use(cors());
// app.options('*', cors());


mongoose.connection.on('connected', () => {
  console.log('Connected to database!');
  
  for (let i = 0; i < cities.length; i++) {
    (new City(cities[i]))
    .save()
    .then(() => console.log('city saved'))
    .catch(() => console.log('failed saving city'));
  }

});
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
// app.use(session({
//   secret: process.env.SECRET,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     stringify: false
//   }),
// }));
//
// passport.serializeUser((user, done) => done(null, user._id));
//
// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => done(err, user));
// });
//
// passport.use(new LocalStrategy((username, password, done) => {
//   User.findOne({email: username}, (err, user) => {
//     if (err) return done(err);
//     if (!user) return done(null, false);
//     if (user.password !== password) return done(null, false);
//     return done(null, user);
//   });
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.use(auth(passport, User));
app.use(routes(City));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
