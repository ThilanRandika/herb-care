const express = require("express");
const router = express.Router();
const Service = require("../../models/HolidayPackage/service");

// Create a new service
router.post("/", async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single service by ID
router.get("/:id", getService, (req, res) => {
  res.json(res.service);
});

// Update a service by ID
router.patch("/:id", getService, async (req, res) => {
  if (req.body.name != null) {
    res.service.name = req.body.name;
  }
  // Update other fields as needed
  try {
    const updatedService = await res.service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service by ID
router.delete("/:id", getService, async (req, res) => {
  try {
    await res.service.remove();
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get single service by ID
async function getService(req, res, next) {
  let service;
  try {
    service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: "Service not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.service = service;
  next();
}

module.exports = router;
