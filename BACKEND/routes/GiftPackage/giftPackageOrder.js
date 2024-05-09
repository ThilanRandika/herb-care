// http://localhost:8070/giftPackageOrder

const router = require("express").Router();
const GiftPackageOrder = require("../../models/GiftPackage/giftPackageOrder");
const CustomizeGiftPackage = require("../../models/GiftPackage/customizeGiftPackage");
const DefaultGiftPack = require("../../models/GiftPackage/defaultGiftpackage");
const Customer = require("../../models/user/Customer");
const mongoose = require("mongoose");
const { verifyToOther } = require("../../utils/veryfyToken");

//Create- Place order
// POST route to create a new gift package order
router.route('/create/:packageId').post(verifyToOther, async (req, res) => {
  try {
    // Verify that req.person.userId is properly set
    if (!req.person || !req.person.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verify that req.params.packageId is properly set
    if (!req.params.packageId) {
      return res.status(400).json({ message: 'Invalid packageId' });
    }

    // Get the default gift package details
    const defaultGiftPackage = await DefaultGiftPack.findById(req.params.packageId);

    if (!defaultGiftPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Calculate total amount (total price + delivery price)
    const deliveryPrice = 200;
    const totalAmount = parseFloat(defaultGiftPackage.totalPrice) + deliveryPrice;

    const newOrder = new GiftPackageOrder({
      Customer: req.person.userId,
      packageId: req.params.packageId,
      orderName: req.body.orderName,
      orderAddress: req.body.orderAddress,
      area: req.body.area,
      postalCode: req.body.postalCode,
      mobileNum: req.body.mobileNum,
      paymentMethod: req.body.paymentMethod,
      totalAmount: totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully', order: newOrder, totalPrice: defaultGiftPackage.totalPrice, totalAmount: totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// GET route to retrieve order details by order ID
router.route('/order/:orderId').get(async (req, res) => {
  try {
    const order = await GiftPackageOrder.findById(req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const defaultGiftPackage = await DefaultGiftPack.findById(order.packageId);
    if (!defaultGiftPackage) {
      return res.status(404).json({ message: 'Default gift package not found' });
    }

    const totalPrice = defaultGiftPackage.totalPrice;
    const deliveryPrice = 200;
    const totalAmount = parseFloat(totalPrice) + deliveryPrice;

    res.status(200).json({
      order,
      totalPrice,
      deliveryPrice,
      totalAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve order details', error: error.message });
  }
});



// Display order details in staff dashboard
router.get('/displayGiftPackageOrders', async (req, res) => {
  try {
    const giftPackageOrders = await GiftPackageOrder.find()
    res.json(giftPackageOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  });


  // Cancel a gift package order
  router.delete('/cancelGiftPackageOrders/:id', async (req, res) => {
    try {
      await GiftPackageOrder.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Gift package order cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


module.exports = router;