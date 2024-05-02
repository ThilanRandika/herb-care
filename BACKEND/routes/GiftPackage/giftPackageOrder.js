// http://localhost:8070/giftPackageOrder

const router = require("express").Router();
const GiftPackageOrder = require("../../models/GiftPackage/giftPackageOrder");
const CustomizeGiftPackage = require("../../models/GiftPackage/customizeGiftPackage");
const DefaultGiftPack = require("../../models/GiftPackage/defaultGiftpackage");
const Customer = require("../../models/user/Customer");
const mongoose = require("mongoose");


// Place a gift package order
router.post('/addGiftPackageOrders', async (req, res) => {
  try {
    const { customerId, packageId, orderAddress } = req.body;

    console.log("Package ID:", packageId); // Log the packageId 
    
    // Check if the packageId refers to defaultGiftPackage or customizeGiftPackage
    let defaultPackage;
    let customizePackage;

    // Ensure that packageId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }

    defaultPackage = await DefaultGiftPack.findById(packageId);
    customizePackage = await CustomizeGiftPackage.findById(packageId);

    if (!defaultPackage && !customizePackage) {
      return res.status(400).json({ message: 'Invalid package ID' });
    }
    
    // Fetch customer details
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    // Calculate total price based on the selected package
    const totalPrice = defaultPackage ? defaultPackage.totalPrice : customizePackage.totalPrice;

    // Return the selected package details along with customer details
    res.status(200).json({ 
      packageDetails: defaultPackage || customizePackage, 
      customerDetails: customer,
      totalPrice,
      orderAddress
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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