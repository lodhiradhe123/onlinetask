var express = require("express");
var router = express.Router();
var isLoggedIn = require("../utils/auth");
var productSchema = require("../models/product");
const product = require("../models/product");
var uploads = require("../utils/multer").single("file");

router.get("/createproduct", isLoggedIn, function (req, res, next) {
  res.render("createproduct");
});
router.post(
  "/createproduct",
  uploads,
  isLoggedIn,
  async function (req, res, next) {
    try {
      const product = new productSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        user: req.user._id,
      });
      req.user.products.push(product._id);

      req.user.save();
      await product.save();
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
