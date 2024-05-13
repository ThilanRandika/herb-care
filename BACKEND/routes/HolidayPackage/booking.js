const express = require("express");
const router = express.Router();
const Booking = require("../../models/HolidayPackage/booking");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single booking by ID
router.get("/:id", getBooking, (req, res) => {
  res.json(res.booking);
});

// Update a booking by ID
router.patch("/:id", getBooking, async (req, res) => {
  // Update booking fields as needed
  try {
    if (req.body.status != null) {
      res.booking.status = req.body.status;
    }
    const updatedBooking = await res.booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a booking by ID
router.delete("/:id", getBooking, async (req, res) => {
  try {
    await res.booking.remove();
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get single booking by ID
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id);
    if (booking == null) {
      return res.status(404).json({ message: "Booking not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.booking = booking;
  next();
}

module.exports = router;
