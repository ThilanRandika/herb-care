const mongoose = require("mongoose");

// Define Service Schema
const serviceSchema = new mongoose.Schema(
  {
    // Category of the service (e.g., hair care, body massage)
    category: {
      type: String,
      required: true,
    },
    // Name of the service
    name: {
      type: String,
      required: true,
    },
    // Description of the service (optional)
    description: {
      type: String,
    },
    // Price of the service
    price: {
      type: Number,
      required: true,
    },
    // Indicates whether the service is a default service or an additional service
    isDefault: {
      type: Boolean,
      default: false, // Defaults to false if not specified
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create Service model
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;