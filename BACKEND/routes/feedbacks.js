const router = require("express").Router();
const Feedback = require("../models/feedback");
const multer = require('multer');
const path = require('path');


//Create - Feedback submition

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
// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const Feedback = require("../models/Feedback");

// // Image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // POST: http://localhost:8070/feedback/add
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     // Save feedback details and file path to MongoDB
//     const feedback = new Feedback({
//       rating: req.body.rating,
//       message: req.body.message,
//       image: req.file ? req.file.path : null,
//       userId: req.user._id, // Assuming you have user authentication middleware
//       orderId: req.body.orderId,
//       productId: req.body.productId,
//       giftPackageId: req.body.giftPackageId
//     });
//     await feedback.save();
//     res.status(201).json({ message: 'Feedback submitted successfully', feedback });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// });




//Read - Display user dashboard
// http://localhost:8070/feedback/get/:id
router.get('/get/:userId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.params.userId });
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Read - Display under the product
//http://localhost:8070/feedback/get/:productId
router.get('/product/:productId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ productId: req.params.productId });
    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Read - Display under the product
//http://localhost:8070/feedback/
router.get('/gift/:giftPackageId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ giftPackageId: req.params.giftPackageId });
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


