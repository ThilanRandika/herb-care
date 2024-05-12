const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintsSchema = new Schema({
      Customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
      },
      Order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true
      },
      Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
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
        enum: ["In Progress", "Resolved", "Removed"],
        default: "In Progress"
      },
},
    {timestamps : true}
);

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;