const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema(
  {
    specialist: {
      type: Schema.Types.ObjectId,
      ref: "Specialist",
      required: true,
    },
    type: {
      type: String,
      enum: ["physical", "virtual"],
      required: true,
    },
    center: {
      type: Schema.Types.ObjectId,
      ref: "Center",
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    bookedTimeSlots: [{
      type: String,
      required: true
    }]
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", AvailabilitySchema);

module.exports = Availability;
