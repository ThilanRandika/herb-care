const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    userId: {
        type: Schema.type.ObjectId,
        ref: "Customer",
        required: true
    },
    orderId: {
        type: Schema.type.ObjectId,
        ref: "order",
        required: true
    },
    productId: {
        type: Schema.type.ObjectId,
        ref: "product",
        required: true
    },
    customizeGiftId: {
        type: Schema.type.ObjectId,
        ref: "customizeGift",
        required: true
    },
    defaultGiftId: {
        type: Schema.type.ObjectId,
        ref: "defaultGift",
        required: true
    },
    retings: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    Date$Time: {
        type: Date,
        required: true 
    },

},
  
{ timestamps: true }  

);

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = feedback;
