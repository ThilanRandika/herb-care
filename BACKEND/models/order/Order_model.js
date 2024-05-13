const mongoose = require('mongoose');

// Define the schema for Order
const OrderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String, // Changed to String from Number
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number, // Changed to Number from String
        required: true
    },
});

const Order = mongoose.model('Order_model', OrderSchema);

module.exports = Order;
