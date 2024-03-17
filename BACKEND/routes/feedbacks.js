const router = require("express").Router();
const Feedback = require("../models/feedback");
const multer = require('multer');
const path = require('path');

// const User = require("../models/user");
// const Order = require("../models/order");
// const Product = require("../models/product");
// const GiftPackage = require("../models/giftPackageId");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// http://localhost:8070/feedback/add
router.route('/add').post(upload.single('image'), async (req, res) => {
  try {
    const { userId, orderId, productId, giftPackageId, ratings, message } = req.body;

    // Check if an image was uploaded
    const image = req.file ? req.file.filename : null;

    // Retrieve related values
    // const user = await User.findById(userId);
    // const order = await Order.findById(orderId);
    // const product = await Product.findById(productId);
    // const giftPackage = await GiftPackage.findById(giftPackageId);

    
    // Insert feedback
    const feedback = new Feedback({
      userId,
      orderId,
      productId,
      giftPackageId,
      ratings,
      message,
      image
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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

// http://localhost:8070/feedback/update/:id
router.route('/update/:id').put(async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { userId, orderId, productId, giftPackageId, ratings, message, image } = req.body;

    // Update feedback entry
    await Feedback.findByIdAndUpdate(feedbackId, {
      userId,
      orderId,
      productId,
      giftPackageId,
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


