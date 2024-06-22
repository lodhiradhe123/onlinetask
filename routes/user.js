var express = require("express");
var router = express.Router();

var User = require("../models/user");
var productSchema = require("../models/product");


const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

const isLoggedIn = require("../utils/auth");
const uploads = require("../utils/multer");
const fs = require("fs");
const path = require("path");
//

router.get("/register", function (req, res, next) {
  res.render("index");
});
router.post("/register", async function (req, res, next) {
  try {
    const { name, username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ _id: user._id, email }, "shhhhh");
    res.cookie("token", token);
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
  }
});
router.get("/login", function (req, res, next) {
  res.render("login");
});


router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("user not registered");
    }

    if (user && ( bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ _id: user._id, email }, "shhhhh");

      res.cookie("token", token);
      res.redirect("/user/profile");
    } else {
      res.redirect("/user/login");
    }
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/profile",isLoggedIn,  async function (req, res, next) {
  try {
    const myproducts = await productSchema.find({ user: req.user._id });
    const user = await User.findOne({ _id: req.user._id });
    res.render("profile", { user: user, myproducts });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/logout", isLoggedIn, function (req, res, next) {
 try {
  res.cookie("token","")
  res.redirect("/user/login")
 } catch (error) {
  console.log(error);
 }
});

router.get("/resetpassword", isLoggedIn, function (req, res, next) {
  res.render("resetpassword", { user: req.user });
});

router.post("/resetpassword", isLoggedIn, async function (req, res, next) {
  const { newpassword } = req.body;
  const user = req.user;
  try {
    await user.setPassword( newpassword);
    await user.save();
    res.redirect("/user/login");
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
      res.redirect("/user/forgetpassword");
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
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
  }
});
router.get("/delete/:id", async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.redirect("/user/login");
  } catch (error) {
    console.log(error);
  }
});
router.get("/update/:id", isLoggedIn, async function (req, res, next) {
  res.render("updateuser", { id: req.params.id, user: req.user });
});
router.post(
  "/update/:id",
  isLoggedIn,
  uploads.single("profileimage"),
  async function (req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      
      await user.save();
      res.redirect("/user/profile");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
