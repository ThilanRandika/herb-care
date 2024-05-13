const SellerOrder = require("../../models/sellerPartnership/SellerOrder");
const { verifySellerToOther } = require("../../utils/veryfyToken");
const moment = require('moment');


const router = require("express").Router();

router.route('/completedOrders/count').get(verifySellerToOther, async(req,res) => {

    try {
        const sellerId = req.person.sellerId;

        const count = await SellerOrder.countDocuments({sellerId: sellerId, status:"completed"});

        res.json(count);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
})


router.route('/all/processingOrders/count').get(verifySellerToOther, async(req, res) => {
    try {
      const sellerId = req.person.sellerId;
  
      const count = await SellerOrder.countDocuments({
        sellerId: sellerId,
        status: { $in: ["pending", "processing", "readyToDelivery", "onDelivery", "completed"] }
      });
  
      res.json(count );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.route('/totalOrderedAmount').get(verifySellerToOther, async (req, res) => {
    try {
        const sellerId = req.person.sellerId;
    
        // Aggregate pipeline to group orders by status and calculate total amounts
        const ordersByStatus = await SellerOrder.aggregate([
          { $match: { sellerId: sellerId } },
          { $group: {
              _id: '$status',
              totalAmount: { $sum: '$totalPrice' }
            }
          }
        ]);
    
        // Prepare output format
        const series = ordersByStatus.map(order => order.totalAmount);
        const labels = ordersByStatus.map(order => order._id);
    
        // Send response
        res.json({ series, labels });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
});



router.route('/orders/months/count').get(verifySellerToOther, async(req,res) => {
    try {
        const sellerId = req.person.sellerId;

        const currentMonth = moment().startOf('month');

        // Array to store month-by-month counts
        const monthlyCounts = [];

        // Loop through the past five months
        for (let i = 0; i < 5; i++) {
            // Calculate the start and end dates for the current month
            const startDate = currentMonth.clone().subtract(i, 'months').startOf('month').toDate();
            const endDate = currentMonth.clone().subtract(i, 'months').endOf('month').toDate();

            // Count the orders for the specific seller within the current month
            const count = await SellerOrder.countDocuments({
                sellerId: sellerId,
                createdAt: { $gte: startDate, $lte: endDate }
            });

            // Add the count to the monthlyCounts array
            monthlyCounts.push({
                month: currentMonth.clone().subtract(i, 'months').format('MMMM'),
                count: count
            });
        }

        const lineData = monthlyCounts.map(({ month, count }) => ({
            x: month,
            y: count
        }));

        res.json({ lineData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.route('/quantity/months/count').get(verifySellerToOther, async (req, res) => {
    try {
        const sellerId = req.person.sellerId;

        const currentMonth = moment().startOf('month');

        // Array to store month-by-month counts
        const monthlyCounts = [];

        // Loop through the past five months
        for (let i = 0; i < 5; i++) {
            // Calculate the start and end dates for the current month
            const startDate = currentMonth.clone().subtract(i, 'months').startOf('month').toDate();
            const endDate = currentMonth.clone().subtract(i, 'months').endOf('month').toDate();

            // Get the total ordered product quantities for the specific seller within the current month
            const orders = await SellerOrder.find({
                sellerId: sellerId,
                createdAt: { $gte: startDate, $lte: endDate }
            });

            // Calculate the total ordered product quantities for the current month
            const totalQuantity = orders.reduce((acc, order) => {
                order.products.forEach(product => {
                    acc += product.quantity;
                });
                return acc;
            }, 0);

            // Add the total quantity to the monthlyCounts array
            monthlyCounts.push({
                month: currentMonth.clone().subtract(i, 'months').format('MMM'), // Short month name
                quantity: totalQuantity
            });
        }

        // Transform monthlyCounts to lineData format
        const columnData = monthlyCounts.map(({ month, quantity }) => ({
            x: month,
            y: quantity
        }));

        res.json({ columnData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


  

module.exports = router;