const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FeedbackGiftPackage = require('../../models/Feedback&Complaints/feedbackGiftPackage');
const { verifyToOther } = require("../../utils/veryfyToken");
const PDFDocument = require('pdfkit');


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
  

// Route to get feedbacks for a specific gift package
// GET http://localhost:8070/feedbacksGiftPackage/singleFeedback/:packageId
router.get('/singleFeedback/:packageId', async (req, res) => {
  try {
    const packageId = req.params.packageId;
    const feedbacks = await FeedbackGiftPackage.find({ packageId: packageId }).populate('Customer', 'customer_name');
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Read - User Display
router.get('/', verifyToOther, async (req, res) => {
  try {
      // Fetch feedbacks for the logged-in user
      const feedbacks = await FeedbackGiftPackage.find({ Customer: req.person.userId });

      res.status(200).json({ feedbacks });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Read - staff Display All
router.route('/get/all').get(async (req, res) => {
  try {
    const feedbacks = await FeedbackGiftPackage.find().populate('Customer');
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Route to get the total count of all feedbacks
router.get('/count/feedbacks', async (req, res) => {
  try {
    const totalFeedbacksCount = await FeedbackGiftPackage.countDocuments();
    res.json({ totalFeedbacksCount });
  } catch (error) {
    console.error('Error fetching total feedbacks count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Delete - delete feedbackGiftPackage
// http://localhost:8070/feedback/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id;

    await FeedbackGiftPackage.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Update - update feedback for gift package
// http://localhost:8070/feedback/update/:id
router.put('/update/:id', upload.array('images', 5), async (req, res) => {
  try {
    console.log('Received files:', req.files);

    const feedbackId = req.params.id;
    const { ratings, message } = req.body;

    let newImages = [];
    if (req.files) {
      newImages = req.files.map(file => file.filename);
    }

    console.log('New images:', newImages);

    // Update feedbackGiftPackage entry
    await FeedbackGiftPackage.findByIdAndUpdate(feedbackId, {
      ratings,
      message,
      $push: { image: { $each: newImages } }, // Add new images to existing array
    });

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Download pdf
router.get('/download/pdf', async (req, res) => {
  try {
    const feedbacks = await FeedbackGiftPackage.find().populate('Customer');

    const pdfDoc = new PDFDocument();

    // Set response headers for PDF download
    res.setHeader('Content-Disposition', 'attachment; filename="GiftPackageFeedbacks.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF document directly to the response stream
    pdfDoc.pipe(res);

    // Add content to the PDF document
    pdfDoc.fontSize(12).text('Gift Package Feedbacks Report', { align: 'center' }).moveDown();

    feedbacks.forEach((feedback, index) => {
      pdfDoc.fontSize(10).text(`Feedback ${index + 1}:`);
      pdfDoc.fontSize(8).text(`Customer: ${feedback.Customer.customer_name}`);
      pdfDoc.fontSize(8).text(`Ratings: ${feedback.ratings}`);
      pdfDoc.fontSize(8).text(`Message: ${feedback.message}`);
      pdfDoc.fontSize(8).text(`Date: ${new Date(feedback.createdAt).toLocaleString()}\n\n`);
    });

    // Finalize the PDF document
    pdfDoc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});


module.exports = router;
