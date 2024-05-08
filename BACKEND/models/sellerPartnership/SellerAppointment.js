const mongoose = require("mongoose");

const sellerAppointmentSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      ref: "seller",
    },
    topic: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },
  },
  
  { timestamps: true }
);

const SellerAppointment = mongoose.model("sellerAppointment", sellerAppointmentSchema);
module.exports = SellerAppointment;
