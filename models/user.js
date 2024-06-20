const mongoose = require("mongoose");
const passport = require("passport");
const plm = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  passport: String,
  profileimage: {
    type: String,
    default: "defualt.jpg",
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
