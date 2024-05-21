// http://localhost:8070/giftPackageOrder

const router = require("express").Router();
const GiftPackageOrder = require("../../models/GiftPackage/giftPackageOrder");
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
      customer: req.person.userId,
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


router.route('/get/:packageId').get(verifyToOther, async (req, res) => {
  try {
    const getGiftPackage = await DefaultGiftPack.findById(req.params.packageId);
    const user = await Customer.findById(req.person.userId)
    
    if (!getGiftPackage) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const deliveryPrice = 200;
    const totalAmount = parseFloat(getGiftPackage.totalPrice) + deliveryPrice;

    
    const newOrder = {
      orderName: user.customer_name,
      orderAddress: user.address,
      mobileNum: user.contact_num,
      totalAmount: totalAmount,
    };

    res.status(200).json({
      newOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve order details', error: error.message });
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
router.get("/displayGiftPackageOrders", async (req, res) => {
  try {
    const orders = await GiftPackageOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

//update status
// Backend route for updating order status
// giftPackageOrderRoutes.js
router.put("/updateStatus/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { newStatus, newPaymentStatus } = req.body;

  try {
    const order = await GiftPackageOrder.findByIdAndUpdate(
      orderId,
      { orderStatus: newStatus, payment: newPaymentStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
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


  //Display order for user
// GET route to retrieve orders for a specific customer (user)
router.route('/orders').get(verifyToOther, async (req, res) => {
  try {
    const orders = await GiftPackageOrder.find({ customer: req.person.userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
  }
});



// Backend route to get the pending gift package orders count
router.get("/pendingOrders/count", async (req, res) => {
  try {
    // Query the database to count pending gift package orders
    const pendingOrdersCount = await GiftPackageOrder.countDocuments({ orderStatus: "pending" });

    // Respond with the count
    res.status(200).json({ pendingOrdersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch pending orders count", error: error.message });
  }
});



module.exports = router;