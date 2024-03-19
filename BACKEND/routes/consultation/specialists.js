const Specialist = require("../../models/consultation/Specialist.js");
const router = require("express").Router();



// Create a specialist
router.post("/add", async (req, res) => {
    try {
      const newSpecialist = new Specialist(req.body);
      const savedSpecialist = await newSpecialist.save();
      res.status(201).json(savedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create specialist" });
    }
  });
  
  // Update specialist
  router.put("/update/:id", async (req, res) => {
    try {
      const specialistId = req.params.id;
      const updatedSpecialist = await Specialist.findByIdAndUpdate(
        specialistId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedSpecialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update specialist" });
    }
  });
  
  // Delete a specialist
  router.delete("/delete/:id", async (req, res) => {
    try {
      const specialistId = req.params.id;
      await Specialist.findByIdAndDelete(specialistId);
      res.status(200).json({ message: "Specialist deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete specialist" });
    }
  });
  
  // Get all specialists
  router.get("/all", async (req, res) => {
    try {
      const specialists = await Specialist.find();
      res.status(200).json(specialists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch specialists" });
    }
  });
  
  // Get a specific specialist
  router.get("/:id", async (req, res) => {
    try {
      const specialistId = req.params.id;
      const specialist = await Specialist.findById(specialistId);
      if (!specialist) {
        return res.status(404).json({ message: "Specialist not found" });
      }
      res.status(200).json(specialist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch specialist" });
    }
  });







module.exports = router;