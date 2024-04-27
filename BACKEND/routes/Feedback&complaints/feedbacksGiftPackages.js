const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FeedbackGiftPackage = require('../../models/Feedback&Complaints/feedbackGiftPackage');
const { verifyToOther } = require("../../utils/veryfyToken");

// Image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

router.post('/add/:packageId', verifyToOther, upload.array('image', 10), async (req, res) => {
    try {
      const formData = new FormData(); // Create a new FormData object
      
      // Ensure that giftPackageOrder is set in the formData object
      formData.append('giftPackageOrder', req.body.giftPackageOrder);
  
      // Create the FeedbackGiftPackage document
      const feedbackGiftPackage = new FeedbackGiftPackage({
        Customer: req.person.userId, // Assuming you have user authentication middleware
        giftPackageOrder: req.body.giftPackageOrder,
        packageId: req.params.packageId,
        ratings: req.body.ratings,
        message: req.body.message,
        image: req.files.map(file => file.filename) // Save multiple file paths in an array
      });
  
      await feedbackGiftPackage.save();
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route to fetch feedbacks of logged-in user
router.get('/giftpackagefeedbacks', verifyToOther, async (req, res) => {
  try {
      // Fetch feedbacks for the logged-in user
      const feedbacks = await FeedbackGiftPackage.find({ Customer: req.person.userId });

      res.status(200).json({ feedbacks });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to delete a feedback
router.delete('/delete/:feedbackId', verifyToOther, async (req, res) => {
  try {
    const feedback = await FeedbackGiftPackage.findOneAndDelete({ _id: req.params.feedbackId, Customer: req.person.userId });
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found or you do not have permission to delete' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
