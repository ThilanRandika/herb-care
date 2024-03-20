const router = require("express").Router();
const Feedback = require("../../models/Feedback&Complaints/feedback");
const multer = require('multer');
const path = require('path');
const { verifyToOther } = require("../../utils/veryfyToken");
const upload = multer({ dest: 'uploads/' });

//Create - Feedback submition
// http://localhost:8070/feedback/add

// Image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

router.route('/add/:productId').post(verifyToOther,upload.single('image'), async (req, res) => {
  try {

    const feedback = new Feedback({
      Customer: req.person.userId, // Assuming you have user authentication middleware
      Order: req.body.Order,
      Product: req.params.productId,
      giftPackageOrder: req.params.giftPackageOrderId,
      ratings: req.body.ratings,
      message: req.body.message,
      image: req.file.path,
  
    });
    
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Read - Display user dashboard
// http://localhost:8070/feedback/get/:id
router.get('/get/:Customer', async (req, res) => {
  try {
    const feedback = await Feedback.find({ Customer: req.params.Customer });
    res.status(200).json(feedback);
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

//Read - Display under the product
//http://localhost:8070/feedback/
router.get('/gift/:giftPackageOrder', async (req, res) => {
  try {
    const feedback = await Feedback.find({ giftPackageOrder: req.params.giftPackageOrder });
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Read - Display staff & manager dashbord
// http://localhost:8070/feedback/get
router.route('/get').get(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();//.populate('userId orderId productId customizeGiftId defaultGiftId');
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
router.route('/update/:id').put(async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const {ratings, message, image } = req.body;

    // Update feedback entry
    await Feedback.findByIdAndUpdate(feedbackId, {
      ratings,
      message,
      image
    });

    res.status(200).json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


