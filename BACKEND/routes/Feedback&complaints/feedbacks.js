const router = require("express").Router();
const Feedback = require("../../models/Feedback&Complaints/feedback");
const multer = require('multer');
const path = require('path');
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

router.post('/add/:productId', verifyToOther, upload.array('image', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const feedback = new Feedback({
      Customer: req.person.userId, // Assuming you have user authentication middleware
      Order: req.body.Order,
      Product: req.params.productId,
      //giftPackageOrder: req.params.giftPackageOrderId,
      ratings: req.body.ratings,
      message: req.body.message,
      image: req.files.map(file => file.path) // Save multiple file paths in an array
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
router.get('/product/:Product', async (req, res) => {
  try {
    const feedback = await Feedback.find({ Product: req.params.Product });
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// //Read - Display under the giftPackage
// //http://localhost:8070/feedback/
// router.get('/gift/:giftPackageOrder', async (req, res) => {
//   try {
//     const feedback = await Feedback.find({ giftPackageOrder: req.params.giftPackageOrder });
//     res.status(200).json(feedback);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

//Read - Display staff & manager dashbord
// http://localhost:8070/feedback/get
router.route('/').get(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();//.populate('Customer');
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
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





module.exports = router;


