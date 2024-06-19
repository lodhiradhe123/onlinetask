var express = require("express");
var router = express.Router();

var User = require("../models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));

const isLoggedIn = require("../utils/auth");
const uploads = require("../utils/multer").single("file");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.post("/register", async function (req, res, next) {
  const { name, username, email, password } = req.body;
  try {
    const user = await User.register({ name, username, email }, password);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile", { user: req.user });
});

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(() => {
    res.redirect("/login");
  });
});

router.get("/resetpassword", isLoggedIn, function (req, res, next) {
  res.render("resetpassword", { user: req.user });
});

router.post("/resetpassword", isLoggedIn, async function (req, res, next) {
  const { oldpassword, newpassword } = req.body;
  const user = req.user;
  try {
    await user.changePassword(oldpassword, newpassword);
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

router.get("/forgetpassword", function (req, res, next) {
  res.render("forgetpassword", { user: req.user });
});
router.post("/forgetpassword", async function (req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      res.render("newpassword", { user: user });
    } else {
      res.redirect("/forgetpassword");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/newpassword/:id", async function (req, res, next) {
  const { password } = req.body;
  const user = await User.findById(req.params.id);
  try {
    await user.setPassword(password);
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
