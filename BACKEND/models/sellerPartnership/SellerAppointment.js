const mongoose = require("mongoose");

const sellerAppointmentSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "seller",
    },
    topic: {
      type: String,
      required: true,
    },
    discription: {
      type: Number,
      required: true,
    },
    AppointmentDate: {
      type: Date,
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

const SellerAppointment = mongoose.model("sellerOrder", sellerAppointmentSchema);
module.exports = SellerAppointment;
