const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  userId: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Customer",
    required: true
  },
  orderId: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "order",
    required: true
  },
  productId: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "product",
    required: false
  },
  giftPackageId: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "customizeGift",
    required: false
  },
  ratings: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
