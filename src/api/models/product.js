const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: String,
    required: true,
  },
  ProductCategory: {
    type: String,
    required: true,
  },
  addedOn: {
    type: String,
    required: true,
    default: new Date().getTime(),
  },
  ProductImg: [mongoose.Schema.Types.Mixed],
  ProductDesc: { type: String },
  Availablity: { type: Boolean },
});

module.exports = mongoose.model("Product", ProductSchema);
