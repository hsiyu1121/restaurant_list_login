const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!email || !password || !confirmPassword) {
    errors.push({ message: "電子郵件, 密碼, 確認密碼 欄位需要填寫！！" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼和確認密碼不相符！！" });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: "這個Email已經註冊過了！！" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出！！");
  res.redirect("/users/login");
});

module.exports = router;
