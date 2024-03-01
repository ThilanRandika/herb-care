const mongoose = require("mongoose");

const sellerOrderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "seller",
    },
    //quantity,  product, price per item
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: Number,
        pricePerItem: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "completed", "deliverd"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    returnProducts: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: Number,
      }
    ],
  },
  { timestamps: true }
);

const SellerOrder = mongoose.model("sellerOrder", sellerOrderSchema);
module.exports = SellerOrder;
