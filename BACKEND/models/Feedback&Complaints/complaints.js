const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
    userId: {
        type : String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Customer",
        required: true
      },
      orderId: {
        type : String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "order",
        required: true
      },
      productId: {
        type : String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "product",
        required: false
      },
      giftPackageId: {
        type : String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "customizeGift",
        required: false
      },
      complaintsName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
      },
},
    {timestamps : true}
);

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;