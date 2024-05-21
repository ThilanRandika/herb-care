const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApprovalProcessSchema = new Schema({

  // Product Proposal attributes
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Manufactured_price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },

  // Extra ones
  action: {
    type: String,
    enum: ["Add", "Remove", "Update"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  staff_submission_date: {
    type: Date,
    default: Date.now,
  },
  ProductID: {
    type: String,
  },
  inventory_Manager_comments: {
    type: String,
  },

}, { timestamps: true });

const ApprovalProcess = mongoose.model('ApprovalProcess', ApprovalProcessSchema);

module.exports = ApprovalProcess;
