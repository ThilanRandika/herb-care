const mongoose = require("mongoose");

// Define Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    // Reference to the user who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the Customer model
      required: true,
    },
    // Reference to the package that was booked
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package", // Reference to the Package model
      required: true,
    },
    // Date when the booking was made
    bookedOn: {
      type: Date,
      default: Date.now,
    },
    // Date of the booked slot
    bookedDate: {
      type: Date,
      required: true,
    },
    // Start time of the booked slot
    startTime: {
      type: Date,
      required: true,
    },
    // End time of the booked slot
    endTime: {
      type: Date,
      required: true,
    },
    // Array of default services selected for the booking
    defaultServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service", // Reference to the Service model
      },
    ],
    // Array of additional services selected for the booking
    additionalServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service", // Reference to the Service model
      },
    ],
    // Status of the booking (pending, confirmed, canceled, completed, etc.)
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled", "completed"],
      default: "pending",
    },
    // Customer first name
    firstName: {
      type: String,
      required: true,
    },
    // Customer last name
    lastName: {
      type: String,
      required: true,
    },
    // Customer email address
    email: {
      type: String,
      required: true,
    },
    // Customer NIC number
    nicNumber: {
      type: String,
      required: true,
    },
    // Customer home address
    homeAddress: {
      type: String,
      required: true,
    },
    // Total price of the booking
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create Booking model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;