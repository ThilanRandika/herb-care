const mongoose = require("mongoose");

const giftPackageOrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "customer",
    },

    packageId: {
      type: mongoose.Types.ObjectId,
      ref: ["defaultGiftPackage", "customizeGiftPackage"],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    oderAddress: {
      type: String,
      required: true,
    },

    payment: {
      type: String,
      required: true,
      /*enum: ["done", "cash on delivery"],
      default: "pending",*/
    },

    odersStatus: {
      type: String,
      required: true,
      enum: ["pending", "processing", "completed", "deliverd"],
      default: "pending",
    }, 
  },
  { timestamps: true }
);

const GiftPackageOrder = mongoose.model("giftPackageOrder", giftPackageOrderSchema);
module.exports = GiftPackageOrder;