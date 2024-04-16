const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
      Customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
      },
      Order: {
        type:String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Order",
        required: false
      },
      Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
      },
      // giftPackageOrder: {
      //   type : String,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "giftPackageOrder",
      //   required: false
      // },
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
        enum: ["In Progress", "Resolved", "Removed"],
        default: "In Progress"
      },
},
    {timestamps : true}
);

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;