const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialistNotificationSchema = new Schema(
    {
      specialist: {
        type: Schema.Types.ObjectId,
        ref: "Specialist",
        required: true,
      },
      appointment: {
        type: Schema.Types.ObjectId,
        ref: "ConsultAppointment",
        required: true,
      },
      notificationType: {
        type: String,
      },
      notificationDateTime: {
        type: Date,
        required: true,
      },
      notificationStatus: {
        type: String,
        enum: ["Read", "Unread"],
        default: "Unread",
      },
      notificationBody: {
        type: String,
        required: true,
      },
      appointmentDate: {
        type: Date,
      },
      appointmentTime: {
        type: String,
      },
      appointmentType: {
        type: String,
      },
      appointmentCenter: {
        type: Schema.Types.ObjectId,
        ref: "Center",
      },
    },
    { timestamps: true }
  );
  
const SpecialistNotification = mongoose.model("SpecialistNotification", specialistNotificationSchema);  
module.exports = SpecialistNotification;
