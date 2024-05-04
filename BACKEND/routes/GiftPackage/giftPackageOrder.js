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

    const newOrder = new GiftPackageOrder({
      Customer: req.person.userId,
      packageId: req.params.packageId,
      orderName: req.body.orderName,
      orderAddress: req.body.orderAddress,
      area: req.body.area,
      postalCode: req.body.postalCode,
      mobileNum: req.body.mobileNum,
      paymentMethod: req.body.paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
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