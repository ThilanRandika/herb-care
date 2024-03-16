const mongoose = require("mongoose");

const sellerProductsSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      ref: "seller",
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    mini_quantity: {
      type: Number,
      required: true,
    },
    base_price: {
      type: Number,
      required: true,
    },
    price_margine: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SellerProducts = mongoose.model("sellerProducts", sellerProductsSchema);
module.exports = SellerProducts;
