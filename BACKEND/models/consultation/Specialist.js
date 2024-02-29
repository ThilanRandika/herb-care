import mongoose from "mongoose";
const { Schema } = mongoose;

const SpecialistSchema = new Schema(
  {
    specialistName: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Specialist = mongoose.model("Specialist", SpecialistSchema);

export default Specialist;
