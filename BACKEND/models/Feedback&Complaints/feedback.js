const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
    required: true
  },
  Order: {
    type : String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "order",
    required: false
  },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
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
    required: false
  }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
