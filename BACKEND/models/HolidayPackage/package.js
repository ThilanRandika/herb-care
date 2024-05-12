const mongoose = require("mongoose");

// Define package schema
const packageSchema = new mongoose.Schema(
  {
    // Name of the package
    name: {
      type: String,
      required: true, // Name is required
    },
    // URLs of images associated with the package
    images: [
      {
        type: String,
        required: true, // At least one image is required
      },
    ],
    // Description of the package
    description: {
      type: String,
      required: true, // Description is required
    },
    // Default price of the package
    defaultPrice: {
      type: Number,
      required: true, // Default price is required
    },
    // Default services included in the package (references to service documents)
    defaultServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service", // Reference to Service model
      },
    ],
    // Additional services that can be added to the package (references to service documents)
    addOnServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service", // Reference to Service model
      },
    ],
    // Name of the hotel associated with the package
    hotelName: {
      type: String,
      required: true, // Hotel name is required
    },
    // Location of the hotel associated with the package
    hotelLocation: {
      type: String,
      required: true, // Hotel location is required
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields with timestamps
  }
);

// Create a pre-save hook to check if the package name already exists
packageSchema.pre("save", async function (next) {
  const existingPackage = await this.constructor.findOne({ name: this.name });
  if (existingPackage) {
    const error = new Error("Package with the same name already exists.");
    return next(error);
  }
  next();
});

// Create Package model
const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
