const mongoose = require("mongoose");

const sellerBagSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["inBag", "removed", "add To Order"],
      default: "inBag",
    }
  },
  { timestamps: true }
);

const SellerBag = mongoose.model("sellerBag", sellerBagSchema);
module.exports = SellerBag;
