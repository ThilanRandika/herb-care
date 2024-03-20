const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Payment
const PaymentSchema = new mongoose.Schema({
    paymentId: {
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
    datePurchased: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String
    },
    paymentMethod: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
PaymentSchema.pre('save', async function(next) {
    // Hash the username if it exists
    if (this.username) {
        const salt = await bcrypt.genSalt(10);
        this.hashedUsername = await bcrypt.hash(this.username, salt);
    }
    next();
});
// Create the Payment model
const PaymentModel = mongoose.model('Payment', PaymentSchema);

module.exports = PaymentModel;