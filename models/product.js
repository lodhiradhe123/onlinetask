const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    description:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model('Product', productSchema);