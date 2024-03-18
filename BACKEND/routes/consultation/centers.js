const Center = require("../../models/consultation/Center.js");
const router = require("express").Router();



// Create a Center
router.post("/add", async (req, res) => {
    try {
      const newCenter = new Center(req.body);
      const savedCenter = await newCenter.save();
      res.status(200).json(savedCenter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create Center" });
    }
  });
  
  // Update Center
  router.put("/update/:id", async (req, res) => {
    try {
      const CenterId = req.params.id;
      const updatedCenter = await Center.findByIdAndUpdate(
        CenterId,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedCenter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update Center" });
    }
  });
  
  // Delete a Center
  router.delete("/delete/:id", async (req, res) => {
    try {
      const CenterId = req.params.id;
      await Center.findByIdAndDelete(CenterId);
      res.status(200).json({ message: "Center deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete Center" });
    }
  });
  
  // Get all Centers
  router.get("/all", async (req, res) => {
    try {
      const Centers = await Center.find();
      res.status(200).json(Centers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch Centers" });
    }
  });
  
  // Get a specific Center
  router.get("/:id", async (req, res) => {
    try {
      const centerId = req.params.id;
      const center = await Center.findById(centerId);
      if (!center) {
        return res.status(404).json({ message: "Center not found" });
      }
      res.status(200).json(center);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch Center" });
    }
  });







module.exports = router;