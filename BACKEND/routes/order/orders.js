const Order = require("../../models/order/Order.js");
const router = require("express").Router();

// Get all orders for a specific user
router.route("/getOrdersForUser/:userId").get(async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});


// Get an order by its ID
router.route("/getOrderById/:id").get(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve order" });
  }
});


// Add a new order
router.route("/add").post(async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to add order" });
    }
  });



  // Cancel an order by its ID
  router.route("/cancelOrder/:id").put(async (req, res) => {
    try {
      const orderId = req.params.id;
      // Find the order by its ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      // Update the order status to "cancelled"
      order.status = "cancelled";
      // Save the updated order
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to cancel order" });
    }
  });

  
  

module.exports = router;
