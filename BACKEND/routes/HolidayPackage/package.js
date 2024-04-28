const express = require("express");
const router = express.Router();
const Package = require("../../models/HolidayPackage/package");

// Create a new package
router.post("/", async (req, res) => {
  try {
    const package = await Package.create(req.body);
    res.status(201).json(package);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single package by ID
router.get("/:id", getPackage, (req, res) => {
  res.json(res.package);
});

// Update a package by ID
router.patch("/:id", getPackage, async (req, res) => {
  if (req.body.name != null) {
    res.package.name = req.body.name;
  }
  // Update other fields as needed
  try {
    const updatedPackage = await res.package.save();
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a package by ID
router.delete("/:id", getPackage, async (req, res) => {
  try {
    await res.package.remove();
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get single package by ID
async function getPackage(req, res, next) {
  let package;
  try {
    package = await Package.findById(req.params.id);
    if (package == null) {
      return res.status(404).json({ message: "Package not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.package = package;
  next();
}

module.exports = router;