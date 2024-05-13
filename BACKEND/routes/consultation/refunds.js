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



// Check if there is any existing refund for a specific appointment ID
router.get("/checkExistingRefund/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Check if the appointment exists
    const appointment = await ConsultAppointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if there are any existing refunds for this appointment
    const existingRefunds = await Refund.find({ appointment: appointmentId });
    if (existingRefunds.length > 0) {
      return res.status(200).json({ hasRefund: true, refunds: existingRefunds });
    } else {
      return res.status(200).json({ hasRefund: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to check existing refund" });
  }
});





//get refund info by appointment id
router.route("/refundInfo/:appointmentId").get(async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    
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
    });
    res.status(200).json(newRefund);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve refund info" });
  }
});




// Get all refunds for a specific customer
router.get("/customerRefunds/:customerID", async (req, res) => {
  try {
    const { customerID } = req.params;

    // Find all appointments for the customer
    const appointments = await ConsultAppointment.find({ patient: customerID });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for the customer" });
    }

    // Extract appointment IDs
    const appointmentIds = appointments.map(appointment => appointment._id);

    // Find all refunds for the customer's appointments
    const refunds = await Refund.find({ appointment: { $in: appointmentIds } });

    res.status(200).json(refunds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve refunds for the customer" });
  }
});



// Get all refunds with refundStatus "Pending"
router.get("/pendingRefunds", async (req, res) => {
  try {
    const pendingRefunds = await Refund.find({ refundStatus: "Pending" });
    res.status(200).json(pendingRefunds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch pending refunds" });
  }
});


// Get the count of incomplete refunds
router.get("/incompleteRefundsCount", async (req, res) => {
  try {
    const incompleteRefundsCount = await Refund.countDocuments({ refundStatus: { $ne: "Completed" } });
    res.status(200).json({ count: incompleteRefundsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch incomplete refunds count" });
  }
});


// Get the count of all refunds
router.get("/allRefundsCount", async (req, res) => {
  try {
    const allRefundsCount = await Refund.countDocuments(); // Corrected variable name
    res.status(200).json({ count: allRefundsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all refunds count" }); // Updated error message
  }
});



// Get the count of incomplete refunds
router.get("/completeRefundsCount", async (req, res) => {
  try {
    const completeRefundsCount = await Refund.countDocuments({ refundStatus: "Completed" }); // Corrected variable name
    res.status(200).json({ count: completeRefundsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch complete refunds count" }); // Updated error message
  }
});





module.exports = router;