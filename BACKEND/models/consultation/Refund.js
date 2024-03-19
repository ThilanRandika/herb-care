const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefundSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    refundType:{
      type: String,
      required: true,
      enum: ["Full", "Partial"],
    },
    refundAmount: {
      type: Number,
      required: true,
    },
    refundDateTime: {
      type: Date,
      required: true,
    },
    bankAccountDetails: {
      type: String,
      required: true,
    },
    refundStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Refund = mongoose.model("Refund", RefundSchema);

module.exports = Refund;
