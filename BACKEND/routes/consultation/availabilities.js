const router = require("express").Router();
const Availability = require("../../models/consultation/Availability.js");

// Add an availability for a specific specialist
router.post("/add", async (req, res) => {
  try {
    const { specialist, date } = req.body;

    // Check if there is any previous availability for the given date and specialist
    const existingAvailability = await Availability.findOne({ specialist: specialist, date: date});
    if (existingAvailability) {
      return res.status(400).json({ message: "Availability already exists for this date and specialist" });
    }

    // Create new availability if no existing availability found
    const newAvailability = new Availability(req.body);
    const savedAvailability = await newAvailability.save();

    res.status(200).json(savedAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add availability" });
  }
});



// Get availabilities of a specific specialist
router.get("/getAvailabilities/:specialistId", async (req, res) => {
  try {
    const availabilities = await Availability.find({ specialist: req.params.specialistId });
    res.status(200).json(availabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve availabilities" });
  }
});

// Update availability
router.put("/updateAvailability/:id", async (req, res) => {
  try {
    const availabilityId = req.params.id;
    const updatedAvailability = await Availability.findByIdAndUpdate(availabilityId, req.body, { new: true });
    if (!updatedAvailability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update availability" });
  }
});

// Delete availability
router.delete("/deleteAvailability/:id", async (req, res) => {
  try {
    const availabilityId = req.params.id;
    const deletedAvailability = await Availability.findByIdAndDelete(availabilityId);
    if (!deletedAvailability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete availability" });
  }
});


// Get availabilities for a specific date and specialist
router.get("/getAvailabilitiesByDateAndSpecialist", async (req, res) => {
  try {
    const { date, specialistId } = req.query;

    // Convert date to a format compatible with MongoDB date comparison
    const formattedDate = new Date(date);

    // Find availabilities for the specified date and specialist
    const availabilities = await Availability.find({
      date: formattedDate,
      specialist: specialistId
    });

    res.status(200).json(availabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve availabilities" });
  }
});


module.exports = router;
