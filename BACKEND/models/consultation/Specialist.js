const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpecialistSchema = new Schema(
  {
    specialistName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    speciality: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    consultationFee: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Specialist = mongoose.model("Specialist", SpecialistSchema);

module.exports = Specialist;
