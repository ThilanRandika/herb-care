const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsultAppointmentSchema = new Schema(
  {
    specialist: {
      type: Schema.Types.ObjectId,
      ref: "Specialist",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Rejected",
        "Cancelled",
        "Completed",
        "Rescheduled",
      ],
      default: "Pending",
    },
    ratingByCustomer: {
      type: Number,
      min: 0,
      max: 5,
    },
    notesBySpecialist: {
      type: String,
    },
  },
  { timestamps: true }
);

const ConsultAppointment = mongoose.model(
  "ConsultAppointment",
  ConsultAppointmentSchema
);

module.exports = ConsultAppointment;
