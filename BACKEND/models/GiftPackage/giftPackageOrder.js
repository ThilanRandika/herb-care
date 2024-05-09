const mongoose = require("mongoose");

const giftPackageOrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },

    packageId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },

    orderName: {
      type: String,
      required: true
    },

    orderAddress: {
      type: String,
      required: true,
    },
    
    area: {
      type: String,
      required: true,
    },

    postalCode: {
      type: Number,
      required: true,
    },

    mobileNum: {
      type: String,
      required: true,
    },

    paymentMethod:{
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: false,
    },

    payment: {
      type: String,
      enum: ["Pending","Deliverd","Done"],
      default: "Pending"
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "deliverd"],
      default: "pending",
    }, 
  },
  { timestamps: true }
);


// Pre-save hook to select total price from the selected package model
giftPackageOrderSchema.pre('save', async function(next) {
  try {
    let packageModel;

    // Check if the packageId refers to defaultGiftPackage or customizeGiftPackage
    if (await mongoose.model('defaultGiftPackage').findById(this.packageId)) {
      packageModel = 'defaultGiftPackage';
    } else if (await mongoose.model('customizeGiftPackage').findById(this.packageId)) {
      packageModel = 'customizeGiftPackage';
    } else {
      throw new Error('Invalid packageId');
    }

    // Fetch the selected package details
    const packageDetails = await mongoose.model(packageModel).findById(this.packageId);
    if (!packageDetails) {
      throw new Error('Package not found');
    }

    // Assign the total price from the selected package to the totalPrice field
    this.totalPrice = packageDetails.totalPrice;

    next();
  } catch (error) {
    next(error);
  }
});

const GiftPackageOrder = mongoose.model("giftPackageOrder", giftPackageOrderSchema);
module.exports = GiftPackageOrder;