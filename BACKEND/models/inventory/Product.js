const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Manufactured_price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    expireDate: {
      type: Date,
    },
    manufactureDate: {
      type: Date,
    },
    ingredients: {
      type:String,
      required: true
    }

  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
