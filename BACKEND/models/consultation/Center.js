const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CenterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Center = mongoose.model("Center", CenterSchema);

module.exports = Center;
