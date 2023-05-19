require('dotenv').config()
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        });

    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('auth/login', {title: "Login"});
});

router.get('/register', function(req, res, next) {
  res.render('auth/register', {title: "Register"})
});

module.exports = router;