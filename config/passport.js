const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(new LocalStrategy({
  usernameField: 'data[]username',
  passwordField: 'data[]password'
},
  function(username, password, done) {
    console.log(username, password)
    db.user.findOne({ 
      where: {
        username: username 
      }
    }).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch(err => {
      console.log(err)
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport