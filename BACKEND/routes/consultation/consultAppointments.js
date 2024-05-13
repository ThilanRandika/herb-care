const ConsultAppointment = require("../../models/consultation/ConsultAppointment.js");
const SpecialistNotification = require("../../models/consultation/SpecialistNotification.js");
const Availability = require("../../models/consultation/Availability.js");
const { verifyToOther } = require("../../utils/veryfyToken.js");
const router = require("express").Router();
const PDFDocument = require('pdfkit');

// router.route("/add").post(verifyToOther, async (req, res) => {
  //   try {
    //     const userId = req.person.userId;
    //     const newConsultAppointment = new ConsultAppointment({...req.body, patient: userId});
    //       const savedConsultAppointment = await newConsultAppointment.save();

  // CREATE - Consultation Appointment
  router.route("/add").post(async (req, res) => {
    const newconsultAppointment = new ConsultAppointment(req.body);
    try {
      const savedConsultAppointment = await newconsultAppointment.save();

      // Update Availability model
      const availabilityId = req.body.availabilityId;
      const bookedTimeSlot = req.body.timeSlot;
      await Availability.findByIdAndUpdate(availabilityId, { $push: { bookedTimeSlots: bookedTimeSlot } });

      // Create a notification for the specialist
      const notification = new SpecialistNotification({
        specialist: req.body.specialist,
        appointment: savedConsultAppointment._id,
        notificationType: "New Appointment",
        notificationDateTime: new Date(),
        notificationStatus: "Unread",
        appointmentDate: savedConsultAppointment.date,
        appointmentTime: savedConsultAppointment.timeSlot,
        appointmentType: savedConsultAppointment.type,
        notificationBody: "An appointment has been created for you.",
      });
      await notification.save();

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
  router.route("/getAppointmentsForCus/:customerId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        patient: req.params.customerId,
      });
      console.log("patient : ", req.params.customerId);
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

  // Get all cancelled appointments for a specific customer
  router.route("/cancelledAppointments/:customerId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        patient: req.params.customerId,
        status: "Cancelled",
      });
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });

  // Get all rejected appointments for a specific customer
  router.route("/rejectedAppointments/:customerId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        patient: req.params.customerId,
        status: "Rejected",
      });
      res.status(200).json(appointments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve appointments" });
    }
  });


    // Get all incomplete appointments for a specific specialist
  router.route("/getIncompleteAppointments/:specialistId").get(async (req, res) => {
    try {
      const appointments = await ConsultAppointment.find({
        specialist: req.params.specialistId,
        status: { $ne: "completed" }, // Excludes appointments with status "completed"
      });
      res.status(200).json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to retrieve incomplete appointments" });
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




    // Route to generate PDF invoice
    router.get('/generateInvoice/:id', async (req, res) => {
      try {
        // Fetch appointment details from the database
        const appointment = await ConsultAppointment.findById(req.params.id);
        if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Pipe the PDF output to the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="consultation_invoice_appointmentID-${appointment._id}.pdf"`);
        doc.pipe(res);

        // Set theme color
        const themeColor = '#0B4F30';

        // Add company name and title
        doc.font('Helvetica-Bold').fontSize(24).fillColor(themeColor).text('Herbcare', { align: 'center' }).moveDown();
        doc.font('Helvetica-Bold').fontSize(20).fillColor(themeColor).text('Invoice', { align: 'center' }).moveDown();

        // Define function to create table rows
        function createRow(doc, label, value, options = {}) {
          doc.font('Helvetica-Bold').fontSize(12).fillColor(themeColor).text(label, { width: 350, continued: true, ...options }).fillColor('#000000').text(value, { width: 400, align: 'right', ...options }).moveDown();
        }

        // Add appointment information
        doc.fontSize(16).fillColor(themeColor).text('Appointment Information').moveDown();
        createRow(doc, 'Appointment ID:', appointment._id);
        createRow(doc, 'Date:', new Date(appointment.date).toLocaleDateString());
        createRow(doc, 'Time:', appointment.timeSlot);
        createRow(doc, 'Status:', appointment.status);
        doc.moveDown();

        // Add patient information
        doc.fontSize(16).fillColor(themeColor).text('Patient Information').moveDown();
        createRow(doc, 'Name:', appointment.patientInfo.patientName);
        createRow(doc, 'Age:', appointment.patientInfo.patientAge);
        createRow(doc, 'Gender:', appointment.patientInfo.patientGender);
        createRow(doc, 'Phone:', appointment.patientInfo.patientPhone);
        doc.moveDown();

        // Add specialist information
        doc.fontSize(16).fillColor(themeColor).text('Specialist Information').moveDown();
        createRow(doc, 'Specialist Name:', appointment.specialistName);
        doc.moveDown();

        // Conditionally add center information if appointment type is not "virtual"
        if (appointment.type !== "virtual") {
          doc.fontSize(16).fillColor(themeColor).text('Center Information').moveDown();
          createRow(doc, 'Center Name:', appointment.centerName);
          createRow(doc, 'Location:', appointment.centerLocation);
          doc.moveDown();
        }

        // Add additional details
        doc.fontSize(16).fillColor(themeColor).text('Additional Details').moveDown();
        createRow(doc, 'Type:', appointment.type);
        createRow(doc, 'Amount:', appointment.appointmentAmount);

        // Finalize the PDF document
        doc.end();
      } catch (error) {
        console.error('Error generating PDF invoice:', error);
        res.status(500).json({ message: 'Failed to generate PDF invoice' });
      }
    });



    // Update the appointment status to "Completed"
    router.route("/completeAppointment/:id").put(async (req, res) => {
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
        // Update the appointment status to "Completed"
        appointment.status = "Completed";
        const updatedAppointment = await appointment.save();
        res.status(200).json(updatedAppointment);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to complete appointment" });
      }
    });



    // Get the count of ongoing appointments for a specific specialist
    router.route("/getOngoingAppointmentsCount/:specialistId").get(async (req, res) => {
      try {
        const ongoingAppointmentsCount = await ConsultAppointment.countDocuments({
          specialist: req.params.specialistId,
          status: { $ne: "Completed" }, // Excludes appointments with status "Completed"
        });
        res.status(200).json({ count: ongoingAppointmentsCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve ongoing appointments count" });
      }
    });


    // Get the count of all appointments for a specific specialist
    router.route("/getAllAppointmentsCount/:specialistId").get(async (req, res) => {
      try {
        const allAppointmentsCount = await ConsultAppointment.countDocuments({
          specialist: req.params.specialistId
        });
        res.status(200).json({ count: allAppointmentsCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve all appointments count" });
      }
    });


    // Get the count of completed appointments for a specific specialist
    router.route("/getCompletedAppointmentsCount/:specialistId").get(async (req, res) => {
      try {
        const completedAppointmentsCount = await ConsultAppointment.countDocuments({
          specialist: req.params.specialistId,
          status: "Completed", // Filter appointments with status "Completed"
        });
        res.status(200).json({ count: completedAppointmentsCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve completed appointments count" });
      }
    });


    // Get today's appointments count for a specific specialist
    router.route("/getTodaysAppointmentsCount/:specialistId").get(async (req, res) => {
      try {
        // Get the current date
        const currentDate = new Date();
        // Set the start of the day to 00:00:00
        currentDate.setHours(0, 0, 0, 0);
        // Set the end of the day to 23:59:59
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 999);

        const todaysAppointmentsCount = await ConsultAppointment.countDocuments({
          specialist: req.params.specialistId,
          date: { $gte: currentDate, $lte: endOfDay }, // Filter appointments for today
        });

        res.status(200).json({ count: todaysAppointmentsCount });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve today's appointments count" });
      }
    });


    // Route to get the dates of ongoing appointments for a specific specialist
    router.route("/getOngoingAppointmentDates/:specialistId").get(async (req, res) => {
      try {
        // Find appointments that are not marked as "Completed" for the given specialist
        const appointments = await ConsultAppointment.find({
          specialist: req.params.specialistId,
          status: { $ne: "Completed" } // Exclude appointments with status "Completed"
        });

        // Extract unique dates from the appointments
        const appointmentDates = [...new Set(appointments.map(appointment => appointment.date.toDateString()))];

        res.status(200).json({ dates: appointmentDates });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve ongoing appointment dates" });
      }
    });



    // Get the count of ongoing appointments for each day in the future 7 days for a specific specialist
    router.route("/getOngoingAppointmentsCountForNext7Days/:specialistId").get(async (req, res) => {
      try {
        // Get the current date
        const currentDate = new Date();
        // Set the end date to 7 days from now
        const endDate = new Date(currentDate);
        endDate.setDate(endDate.getDate() + 7);
        // Initialize an object to store counts for each day
        const ongoingAppointmentsCounts = {};

        // Loop through each day in the next 7 days
        for (let date = new Date(currentDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          // Set the start of the day to 00:00:00
          date.setHours(0, 0, 0, 0);
          // Set the end of the day to 23:59:59
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);

          // Get the count of ongoing appointments for the current day
          const count = await ConsultAppointment.countDocuments({
            specialist: req.params.specialistId,
            status: { $ne: "Completed" }, // Exclude appointments with status "Completed"
            date: { $gte: date, $lte: endOfDay }, // Filter appointments for the current day
          });

          // Store the count for the current day
          ongoingAppointmentsCounts[date.toISOString().slice(0, 10)] = count;
        }

        res.status(200).json(ongoingAppointmentsCounts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve ongoing appointments count for the next 7 days" });
      }
    });



    



    module.exports = router;
    