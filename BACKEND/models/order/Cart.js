const mongoose = require('mongoose');


// Define the schema for Cart
const CartSchema = new mongoose.Schema({
  customerId: {
    type: String,
    ref: "customer",
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


// Create the Cart model
const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;