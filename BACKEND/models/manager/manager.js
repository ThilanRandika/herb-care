const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagerSchema = new Schema(
  {
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;