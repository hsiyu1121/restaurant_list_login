"use strict";

var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

var FacebookStrategy = require("passport-facebook").Strategy;

var User = require("../models/user");

var bcrypt = require("bcryptjs");

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({
      email: email
    }).then(function (user) {
      if (!user) {
        return done(null, false, req.flash("warning_msg", "Email尚未註冊!"));
      }

      return bcrypt.compare(password, user.password).then(function (isMatch) {
        if (!isMatch) {
          return done(null, false, req.flash("warning_msg", "Email 或 password 錯誤，重新輸入!"));
        }

        return done(null, user);
      });
    })["catch"](function (err) {
      return done(err, false);
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id).lean().then(function (user) {
      return done(null, user);
    })["catch"](function (err) {
      return done(err, null);
    });
  });
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, function (accessToken, refreshToken, profile, done) {
    var _profile$_json = profile._json,
        name = _profile$_json.name,
        email = _profile$_json.email;
    User.findOne({
      email: email
    }).then(function (user) {
      if (user) return done(null, user);
      var randomPassword = Math.random().toString(36).slice(-8);
      bcrypt.genSalt(10).then(function (salt) {
        return bcrypt.hash(randomPassword, salt);
      }).then(function (hash) {
        return User.create({
          name: name,
          email: email,
          password: hash
        });
      }).then(function (user) {
        return done(null, user);
      })["catch"](function (err) {
        return done(err, false);
      });
    });
  }));
};