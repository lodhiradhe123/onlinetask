const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  image: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("Product", productSchema);
