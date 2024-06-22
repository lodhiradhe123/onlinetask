
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
var User = require("../models/user");


const isLoggedIn = async function (req, res, next) {
    
    if(!req.cookies.token){
        res.redirect("/user/login")
    }

    try {
        const decoded = jwt.verify(req.cookies.token, "shhhhh");;
        const user =await User.findOne({email: decoded.email}).select("-password")

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error.message);
    }

};


module.exports = isLoggedIn