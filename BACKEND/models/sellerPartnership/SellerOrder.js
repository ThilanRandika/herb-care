const mongoose = require("mongoose");

const crypto = require('crypto');

const generateOrderviewId = () => {
  const randomNumbers = crypto.randomBytes(2).toString('hex'); 
  return `HC-${randomNumbers}`; 
};

const sellerOrderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      ref: "seller",
    },
    //quantity,  product, price per item
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
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
      enum: ["pending", "processing", "readyToDelivery" , "onDelivery" , "completed"],
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
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        productName: String,
        quantity: Number,
        returnReason: String,
        images: [String]
      }
    ],
    orderviewId: {
      type: String,
      unique: true,
      required: true,
      default: generateOrderviewId
    }
  },
  { timestamps: true }
);

const SellerOrder = mongoose.model("sellerOrder", sellerOrderSchema);
module.exports = SellerOrder;
