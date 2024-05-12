const SpecialistNotification = require("../../models/consultation/SpecialistNotification");

const express = require("express");
const router = express.Router();

// Get unread notifications count for a specialist
router.get("/unreadCount/:specialistId", async (req, res) => {
  try {
    const count = await SpecialistNotification.countDocuments({
      specialist: req.params.specialistId,
      notificationStatus: "Unread",
    });
    res.status(200).json({ unreadCount: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get unread notifications count" });
  }
});

// Get unread notifications for a specialist
router.get("/unread/:specialistId", async (req, res) => {
  try {
    const notifications = await SpecialistNotification.find({
      specialist: req.params.specialistId,
      notificationStatus: "Unread",
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get unread notifications" });
  }
});

// Get read notifications for a specialist
router.get("/read/:specialistId", async (req, res) => {
  try {
    const notifications = await SpecialistNotification.find({
      specialist: req.params.specialistId,
      notificationStatus: "Read",
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get read notifications" });
  }
});

// Get all notifications for a specialist
router.get("/all/:specialistId", async (req, res) => {
  try {
    const notifications = await SpecialistNotification.find({
      specialist: req.params.specialistId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get all notifications" });
  }
});



// Mark all notifications as read for a specialist
router.put("/markAllAsRead/:specialistId", async (req, res) => {
  try {
    await SpecialistNotification.updateMany(
      { specialist: req.params.specialistId },
      { $set: { notificationStatus: "Read" } }
    );
    res.status(200).json({ message: "All notifications marked as read successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark all notifications as read" });
  }
});


// Get unread notifications count for a specialist
router.get("/unreadCount/:specialistId", async (req, res) => {
  try {
    const count = await SpecialistNotification.countDocuments({
      specialist: req.params.specialistId,
      notificationStatus: "Unread",
    });
    res.status(200).json({ unreadCount: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get unread notifications count" });
  }
});

module.exports = router;
