const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsultAppointmentSchema = new Schema(
  {
    specialist: {
      type: Schema.Types.ObjectId,
      ref: "Specialist",
      required: true,
    },
    specialistName: {
      type: String,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["physical", "virtual"],
    },
    center: {
      type: Schema.Types.ObjectId,
      ref: "Center",
    },
    centerName: {
      type: String,
    },
    centerLocation: {
      type: String,
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
    appointmentAmount: {
      type: Number,
    },
    timeSlot: {
      type: String,
    },
    patientInfo: {
      patientName: {
        type: String,
      },
      patientAge: {
        type: String,
      },
      patientGender: {
        type: String,
        enum: ["male", "female"], // If gender is limited to male and female
      },
      patientPhone: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const ConsultAppointment = mongoose.model(
  "ConsultAppointment",
  ConsultAppointmentSchema
);

module.exports = ConsultAppointment;
