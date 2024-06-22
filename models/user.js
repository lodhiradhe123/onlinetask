const mongoose = require("mongoose");
const passport = require("passport");
const plm = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  profileimage: {
    type: String,
    default: "https://images.unsplash.com/photo-1466112928291-0903b80a9466?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});
userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
