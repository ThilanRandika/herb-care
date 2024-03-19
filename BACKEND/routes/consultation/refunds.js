const router = require("express").Router();
const Refund = require("../../models/consultation/Refund.js");
const ConsultAppointment = require("../../models/consultation/ConsultAppointment.js");

// Create refund request
router.post("/add", async (req, res) => {
  try {
      const { appointmentId } = req.body;

      // Check if the appointment exists
      const appointment = await ConsultAppointment.findById(appointmentId);
      if (!appointment) {
          return res.status(404).json({ message: "Appointment not found" });
      }

      // Check if there are any existing refunds for this appointment
      const existingRefunds = await Refund.find({ appointment: appointmentId });
      if (existingRefunds.length > 0) {
          return res.status(400).json({ message: "Refund already exists for this appointment" });
      }

      // Check if the appointment is in "Cancelled" or "Rejected" status
      if (appointment.status !== "Cancelled" && appointment.status !== "Rejected") {
          return res.status(400).json({ message: "Refunds can only be requested for Cancelled or Rejected appointments" });
      }

      // Determine refund type based on appointment status
      let refundType = "";
      if (appointment.status === "Cancelled") {
          refundType = "Partial";
      } else if (appointment.status === "Rejected") {
          refundType = "Full";
      }

      // Calculate refund amount
      const refundAmount = refundType === "Partial" ? 0.8 * appointment.appointmentAmount : appointment.appointmentAmount;

      // Create new refund
      const newRefund = new Refund({
          appointment: appointmentId,
          refundType,
          refundAmount,
          refundDateTime: new Date(),
          bankAccountDetails: req.body.bankAccountDetails,
      });

      // Save the refund
      const savedRefund = await newRefund.save();
      res.status(200).json(savedRefund);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create refund" });
  }
});


  


// Complete refund
router.put("/completeRefund/:id", async (req, res) => {
  try {
    const refundId = req.params.id;
    
    // Find the refund by ID
    const refund = await Refund.findById(refundId);
    if (!refund) {
      return res.status(404).json({ message: "Refund not found" });
    }
    
    // Check if the refund status is already "completed"
    if (refund.refundStatus == "Completed") {
      return res.status(400).json({ message: "Refund has been already completed" });
    }
    
    // Update the refund status to "Completed"
    const updatedRefund = await Refund.findByIdAndUpdate(refundId, { refundStatus: "Completed" }, { new: true });
    res.status(200).json(updatedRefund);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to complete refund" });
  }
});





module.exports = router;