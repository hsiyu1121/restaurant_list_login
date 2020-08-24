"use strict";

var express = require("express");

var router = express.Router();

var User = require("../../models/user");

var passport = require("passport");

var bcrypt = require("bcryptjs");

router.get("/login", function (req, res) {
  res.render("login");
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true
}));
router.get("/register", function (req, res) {
  res.render("register");
});
router.post("/register", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password,
      confirmPassword = _req$body.confirmPassword;
  var errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({
      message: "電子郵件, 密碼, 確認密碼 為必填欄位！！"
    });
  }

  if (password !== confirmPassword) {
    errors.push({
      message: "密碼和確認密碼不相符！！"
    });
  }

  if (errors.length) {
    return res.render('register', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });
  }

  if (!name.length) {
    name = email.slice(0, email.indexOf('@'));
  }

  User.findOne({
    email: email
  }).then(function (user) {
    if (user) {
      errors.push({
        message: "這個Email已經註冊過了！！"
      });
      return res.render('register', {
        errors: errors,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      });
    }

    return bcrypt.genSalt(10).then(function (salt) {
      return bcrypt.hash(password, salt);
    }).then(function (hash) {
      return User.create({
        name: name,
        email: email,
        password: hash
      });
    }).then(function () {
      return res.redirect("/");
    })["catch"](function (err) {
      return console.log(err);
    });
  });
});
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success_msg", "你已經成功登出！！");
  res.redirect("/users/login");
});
module.exports = router;