const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the schema for Order
const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    datePlaced: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
// OrderSchema.pre('save', async function(next) {
//     // Hash the username if it exists
//     if (this.username) {
//         const salt = await bcrypt.genSalt(10);
//         this.hashedUsername = await bcrypt.hash(this.username, salt);
//     }
//     next();
// });
// Create the Order model
const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;