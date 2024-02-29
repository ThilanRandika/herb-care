import mongoose from "mongoose";
const { Schema } = mongoose;

const RefundSchema = new Schema(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
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

export default Refund;
