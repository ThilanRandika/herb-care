const ConsultAppointment = require("../../models/consultation/ConsultAppointment.js");
const router = require("express").Router();

// CREATE - Consultation Appointment
router.route("/add").post(async (req, res) => {
    const newconsultAppointment = new ConsultAppointment(req.body);
    try {
      const savedConsultAppointment = await newconsultAppointment.save();
      res.status(200).json(savedConsultAppointment);
    } catch (err) {
      console.log(err);
    }
  });
  
  // Get all appointments
  router.route("/getAll").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find();
      if (!appointments) return res.status(404).json({ msg: "No appointments" });
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });
  
  // Get all appointments for a specific specialist
  router.route("/getAppointments/:specialistId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        specialist: req.params.specialistId,
      });
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });
  
  // Get all upcoming appointments for a specific specialist
  router.route("/getUpcomingAppointments/:specialistId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        specialist: req.params.specialistId,
        status: "Pending",
      });
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });
  
  // Get all appointments for a specific customer
  router.route("/getAppointments/:customerId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        patient: req.params.customerId,
      });
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });
  
  // Get all incomplete appointments for a specific customer
  router.route("/getOngoingAppointments/:customerId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        patient: req.params.customerId,
        status: { $ne: "completed" },
      });
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });
  
  // Get a specific appointment by ID
  router.route("/getAppointment/:id").get(async (req, res) => {
    try {
      const appointment = await ConsultAppointment.findById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(200).json(appointment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointment" });
    }
  });

  // Reject an appointment
router.route("/rejectAppointment/:id").put(async (req, res) => {
    try {
      const appointmentId = req.params.id;
      // Check if the appointment exists
      const appointment = await ConsultAppointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      // Check if the appointment is in "Pending" status
      if (appointment.status !== "Pending") {
        return res.status(400).json({ message: "Appointment is not in Pending status" });
      }
      // Update the appointment status to "Rejected"
      appointment.status = "Rejected";
      const updatedAppointment = await appointment.save();
      res.status(200).json(updatedAppointment);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to reject appointment" });
    }
  });
  
  // Reschedule an appointment
    router.route("/rescheduleAppointment/:id").put(async (req, res) => {
        try {
        const appointment = await ConsultAppointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        if (appointment.status !== "Rejected") {
            return res.status(400).json({
            message: "Appointment can only be rescheduled if it is rejected",
            });
        }
        appointment.date = req.body.date || appointment.date;
        appointment.specialist = req.body.specialist || appointment.specialist;
        appointment.status = "Rescheduled";
        const updatedAppointment = await appointment.save();
        res.status(200).json(updatedAppointment);
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to reschedule appointment" });
        }
    });

    // Cancel an appointment
    router.route("/cancelAppointment/:id").put(async (req, res) => {
        try {
        const appointment = await ConsultAppointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        // Check if the appointment is in "Pending" status
        if (appointment.status !== "Pending") {
            return res.status(400).json({
            message: "Appointment is not in Pending status and cannot be canceled",
            });
        }
        // Calculate the time difference between the current time and the appointment time
        const currentTime = new Date();
        const appointmentTime = new Date(appointment.date);
        const timeDifferenceInHours =
            Math.abs(appointmentTime - currentTime) / 36e5;
        // Check if the appointment can be canceled (at least 24 hours before the appointment time)
        if (timeDifferenceInHours < 24) {
            return res.status(400).json({
            message: "Appointment cannot be canceled less than 24 hours before the scheduled time",
            });
        }
        // Update appointment status to "Cancelled"
        appointment.status = "Cancelled";
        const updatedAppointment = await appointment.save();
        res.status(200).json(updatedAppointment);
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to cancel appointment" });
        }
    });


    module.exports = router;
    