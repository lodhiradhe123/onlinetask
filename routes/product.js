var express = require("express");
var router = express.Router();
var isLoggedIn = require("../utils/auth");
var productSchema = require("../models/product");
const product = require("../models/product");
var uploads = require("../utils/multer");

var fs = require("fs");
var path = require("path");
router.get("/createproduct", isLoggedIn, function (req, res, next) {
  res.render("createproduct");
});
router.post(
  "/createproduct",
  uploads.single("image"),
  isLoggedIn,
  async function (req, res, next) {
    try {
      const product = new productSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        user: req.user._id,
      });
      req.user.products.push(product._id);
      req.user.save();
      await product.save();
      res.redirect("/user/profile");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get('/delete/:id',isLoggedIn, async function(req, res) {
  try {
    const product = await productSchema.findByIdAndDelete(req.params.id);
    fs.unlinkSync(path.join(__dirname,"../","public","images", product.image))
    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
  }
})

router.get('/updateproduct/:id',isLoggedIn, async function(req, res){
  const product = await productSchema.findById(req.params.id)
  res.render("updateProduct",{user:req.user,product:product});
})

router.post('/updateproduct/:id',isLoggedIn,uploads.single("image") ,async function(req, res){
  try {
    const product = await productSchema.findById(req.params.id)
    if(product.image!== req.file.filename){
      fs.unlinkSync(path.join(__dirname,"../","public","images", product.image))
    }
    product.image = req.file.filename
    product.name = req.body.name;
    product.description = req.body.description;
   
    await product.save();
    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
  }
})

router.get('/allproducts',async function(req, res){
   const allproducts = await productSchema.find()
  //  res.json(allproducts)
   res.render("allproducts",{user:req.user,allproducts:allproducts})
});

module.exports = router;
