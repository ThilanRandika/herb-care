const mongoose = require("mongoose");

const sellerNotificationSchema = new Schema(
    {
      seller: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required: true,
      },
      notificationType: {
        type: String,
        required: true,
      },
      notificationDateTime: {
        type: Date,
        required: true,
      },
      notificationStatus: {
        type: String,
        enum: ["Sent", "Delivered", "Failed"],
        default: "Sent",
      },
      notificationBody: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
const SellerNotification = mongoose.model("Notification", sellerNotificationSchema);  
module.exports = SellerNotification;
