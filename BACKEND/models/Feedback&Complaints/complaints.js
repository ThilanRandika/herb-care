const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
    Customer: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
      },
      Oreder: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
      },
      Product: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false
      },
      giftPackageOrder: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "giftPackageOrder",
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