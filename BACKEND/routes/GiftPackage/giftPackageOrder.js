// http://localhost:8070/giftPackageOrder

const router = require("express").Router();
const GiftPackageOrder = require("../../models/GiftPackage/giftPackageOrder");
const CustomizeGiftPackage = require("../../models/GiftPackage/customizeGiftPackage");
const DefaultGiftPack = require("../../models/GiftPackage/defaultGiftpackage");


// Place a gift package order
router.post('/addGiftPackageOrders', async (req, res) => {
    try {
      const { customerId, packageId, orderAddress } = req.body;
  
      // Check if the packageId refers to defaultGiftPackage or customizeGiftPackage
      const defaultPackage = await DefaultGiftPack.findById(packageId);
      const customizePackage = await CustomizeGiftPackage.findById(packageId);
  
      if (!defaultPackage && !customizePackage) {
        return res.status(400).json({ message: 'Invalid package ID' });
      }
  
      // Calculate total price based on the selected package
      const totalPrice = defaultPackage ? defaultPackage.totalPrice : customizePackage.totalPrice;
  
      const giftPackageOrder = new GiftPackageOrder({
        customerId,
        packageId,
        totalPrice,
        orderAddress
      });
  
      await giftPackageOrder.save();
  
      res.status(201).json({ message: 'Order confirmed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


// Display package details in staff dashboard
router.get('/displayGiftPackageOrders/:id', async (req, res) => {
    try {
      const giftPackageOrder = await GiftPackageOrder.findById(req.params.id).populate('packageId');
  
      if (!giftPackageOrder) {
        return res.status(404).json({ message: 'Gift package order not found' });
      }

      res.status(200).json(giftPackageOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
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