const router = require("express").Router();
const Feedback = require("../../models/Feedback&Complaints/feedback");
const multer = require('multer');
const path = require('path');
const { verifyToOther } = require("../../utils/veryfyToken");
const PDFDocument = require('pdfkit');
const Product = require('../../models/inventory/Product');


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

router.post('/add/:productId', verifyToOther, upload.array('image', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const feedback = new Feedback({
      Customer: req.person.userId, // Assuming you have user authentication middleware
      Order: req.body.orders,
      Product: req.params.productId,
      ratings: req.body.ratings,
      message: req.body.message,
      image: req.files.map(file => file.filename) // Save multiple file paths in an array
    });
    
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Read - Display user dashboard
// http://localhost:8070/feedback/get
router.route("/get").get(verifyToOther, async (req, res) => {
  try {

    const feedbacks = await Feedback.find({ Customer: req.person.userId });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});




//Read - Display under the product
//http://localhost:8070/feedback/get/:productId
router.route('/feedbacks/:productId').get(async (req, res) => {
  try {
    const productId = req.params.productId;
    const feedbacks = await Feedback.find({ Product: productId }).populate('Customer', 'customer_name');
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Read - Display staff & manager dashbord
// http://localhost:8070/feedback/get
router.route('/').get(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('Customer');
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//Read- feedback count
router.get('/count', async (req, res) => {
  try {
    const count = await Feedback.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get feedback count' });
  }
});



//Delete - delete feedback
// http://localhost:8070/feedback/delete/:id
router.route('/delete/:id').delete(async (req, res) => {
  try {
    const feedbackId = req.params.id;

    await Feedback.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Update - update feedback
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

    // Update feedback entry
    await Feedback.findByIdAndUpdate(feedbackId, {
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



// feedback summary at home page
// http://localhost:8070/feedback/feedback-summaries
router.get('/feedback-summaries', async (req, res) => {
  try {
    const feedbackSummaries = await Feedback.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'Product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          productName: '$product.name',
          productImage: '$product.image',
          ratings: 1,
          message: 1
        }
      }
    ]);

    res.status(200).json(feedbackSummaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route to generate and download all feedback as PDF
router.get('/download', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('Customer');

    // Create a new PDF document
    const pdfDoc = new PDFDocument();
    const fileName = 'feedbacks.pdf';

    // Set response headers for PDF download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF document directly to the response stream
    pdfDoc.pipe(res);

    // Calculate the vertical position for centering content
    const pageHeight = pdfDoc.page.height;
    const contentHeight = (feedbacks.length + 1) * 50; // Assuming each feedback block is 50 units in height
    const verticalPosition = (pageHeight - contentHeight) / 2;

    // Set the initial y position for the content
    let yPosition = verticalPosition;

    // Add content to the PDF document
    pdfDoc.fontSize(12).text('Feedbacks Report', { align: 'center' }).moveDown();
    feedbacks.forEach((feedback, index) => {
      pdfDoc.fontSize(10).text(`Feedback ${index + 1}:`, { y: yPosition });
      pdfDoc.fontSize(8).text(`Customer: ${feedback.Customer.customer_name}`, { y: yPosition + 20 });
      pdfDoc.fontSize(8).text(`Ratings: ${feedback.ratings}`, { y: yPosition + 40 });
      pdfDoc.fontSize(8).text(`Message: ${feedback.message}`, { y: yPosition + 60 });
      pdfDoc.fontSize(8).text(`Date: ${new Date(feedback.createdAt).toLocaleString()}\n\n`, { y: yPosition + 80 });

      // Move to the next block
      yPosition += 100;
    });

    // Finalize the PDF document
    pdfDoc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});


module.exports = router;


