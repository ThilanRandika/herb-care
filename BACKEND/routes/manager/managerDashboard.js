const Manager = require("../../models/manager/manager");
const OrderModel = require("../../models/order/Order");
const Seller = require("../../models/sellerPartnership/Seller");
const SellerOrder = require("../../models/sellerPartnership/SellerOrder");
const Refund = require("../../models/consultation/Refund");


const router = require("express").Router();

router.route('/count').get( async (req, res) => {
    try {
      // Query the Seller collection to count documents
      const sellerCount = await Seller.countDocuments();
      const orderCount = await OrderModel.countDocuments();
      const sellerOrderCount = await SellerOrder.countDocuments();
      const incompleteRefundsCount = await Refund.countDocuments({ refundStatus: { $ne: "Completed" } });

      const cardCounts = {
        sellers: sellerCount,
        orders: orderCount,
        sellerOrders: sellerOrderCount,
        consultationRefund: incompleteRefundsCount,
      }
      
      // Send the count as a JSON response
      res.json({ cardCounts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  

module.exports = router;
