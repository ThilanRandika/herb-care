const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackGiftPackageSchema = new Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  giftPackageOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "giftPackageOrder",
    required: false
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "defaultgiftpackages",
    required: true
  },
  ratings: {
    type: Number,
    default: 0,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const FeedbackGiftPackage = mongoose.model('FeedbackGiftPackage', feedbackGiftPackageSchema);

module.exports = FeedbackGiftPackage;
