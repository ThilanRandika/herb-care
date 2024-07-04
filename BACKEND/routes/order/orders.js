const Product = require("../../models/inventory/Product.js");
const Feedback = require("../../models/Feedback&Complaints/feedback.js");
const Order = require("../../models/order/Order.js");
const router = require("express").Router();


router.route("/getOngoingOrdersForUser/:userId").get(async (req, res) => {

  const userId = req.params.userId;
  try {
    const ongoingStatuses = ["pending", "processing", "readyToDelivery", "onDelivery"];
    const orders = await Order.find({
      userId: userId,
      status: { $in: ongoingStatuses }
    });

    const completedOrdersCount = await Order.countDocuments({
      userId: userId,
      status: "completed"
    });

    // Fetch cancelled orders count
    const cancelledOrdersCount = await Order.countDocuments({
      userId,
      status: "cancelled"
    });

    ongoingOrders = orders.map(order => {
      return {
        id: order._id,
        status: order.status,
        price: order.totalPrice,
        paymentMethod: order.payment,
        date: order.datePlaced
      }
    })
    res.status(200).json({
      ongoingOrders: ongoingOrders,
      completedOrdersCount: completedOrdersCount,
      cancelledOrdersCount: cancelledOrdersCount
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});

router.route("/getCompleteOrdersForUser/:userId").get(async (req, res) => {
  const userId = req.params.userId;
  try {
      const orders = await Order.find({
          userId: userId,
          status: "completed"
      }).populate('products.product'); // Populate product details

      const completeOrders = orders.map(order => {
          return {
              id: order._id,
              status: order.status,
              price: order.totalPrice,
              paymentMethod: order.payment,
              date: order.datePlaced,
              products: order.products.map(product => ({
                  productId: product.product._id,
                  productName: product.product.name,
                  image: product.product.image, // Assuming product schema has an image field
                  quantity: product.quantity
              }))
          };
      });
      res.status(200).json(completeOrders);
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve orders" });
  }
});



//get one order detail
router.route('/getOneOrder/:orderId').get( async (req, res) => {
  try {
      const orderId = req.params.orderId;
      console.log(orderId)
      const singleOrder = await Order.findById(orderId).populate('products.product');
      // Format the data according to the provided format
      const formattedOrder = {
          
              id: singleOrder._id, // Assuming MongoDB automatically generates IDs for SellersingleOrder
              address: singleOrder.shippingAddress, // Assuming sellerId represents the customer in this context
              date: singleOrder.datePlaced, // Assuming createdAt represents the singleOrder date
              price: singleOrder.totalPrice.toFixed(2), // Assuming totalPrice is a number
              status: singleOrder.status,
              paymentMethod: singleOrder.payment, 
              orderDetails: singleOrder.products.map(product => ({
                  productId: product.product._id,
                  productName: product.product.name,
                  quantity: product.quantity,
                  price: product.pricePerItem.toFixed(2),
                  totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
              }))
         
      }

      res.status(200).json(formattedOrder);
  } catch (error) {
      console.error('Error fetching single orders:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add a new order
// router.route("/add").post(async (req, res) => {
//     const newOrder = new Order(req.body);
//     try {
//       const savedOrder = await newOrder.save();
//       res.status(200).json(savedOrder);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Failed to add order" });
//     }
//   });


  router.route('/placeOrder/:userId').post( async (req, res) => {
    try {
        const userId = req.params.userId;

        // Extract data from request body
        const { user, products } = req.body;
        const { totalPrice, payment, address, contactNumber } = user;

        // Create products array for Order schema
        const productsArray = products.map(product => ({
            product: product.productId, // Assuming you have a productId for each product
            quantity: product.quantity,
            pricePerItem: product.pricePerItem
        }));

        // Create a new Order instance
        const newOrder = new Order({
            userId,
            products: productsArray,
            totalPrice,
            payment,
            shippingAddress: address,
            contactNumber
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to place order" });
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


  //get all pending orders
  router.route("/getAllPendingOrders").get(async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "pending" });
  
      const formattedOrders = pendingOrders.map(order => {
        return {
          id: order._id,
          userId: order.userId,
          status: order.status,
          price: order.totalPrice.toFixed(2),
          paymentMethod: order.payment,
          date: order.datePlaced,
          shippingAddress: order.shippingAddress,
          contactNumber: order.contactNumber,
          orderDetails: order.products.map(product => ({
            productName: product.productName,
            productId: product.product,
            quantity: product.quantity,
            price: product.pricePerItem,
            totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
          }))
        };
      });
  
      res.status(200).json(formattedOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve pending orders" });
    }
  });


  //Set the State of All Pending Orders to Processing
  router.route("/setAllPendingToProcessing").put(async (req, res) => {
    try {
      const updatedOrders = await Order.updateMany(
        { status: "pending" },
        { $set: { status: "processing" } }
      );
  
      if (updatedOrders.modifiedCount === 0) {
        return res.status(404).json({ message: "No pending orders found" });
      }
  
      res.status(200).json({ message: "All pending orders set to processing" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update orders to processing" });
    }
  });




  //set order to processing
  router.route("/setOrderToProcessing/:id").put(async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Find the order by its ID and update the status to "processing"
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: "processing" } },
        { new: true } // To return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update order to processing" });
    }
  });



  //get all processing orders
  router.route("/getAllProcessingOrders").get(async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "processing" });
  
      const formattedOrders = pendingOrders.map(order => {
        return {
          id: order._id,
          userId: order.userId,
          status: order.status,
          price: order.totalPrice.toFixed(2),
          paymentMethod: order.payment,
          date: order.datePlaced,
          shippingAddress: order.shippingAddress,
          contactNumber: order.contactNumber,
          orderDetails: order.products.map(product => ({
            productName: product.productName,
            productId: product.product,
            quantity: product.quantity,
            price: product.pricePerItem,
            totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
          }))
        };
      });
  
      res.status(200).json(formattedOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve processing orders" });
    }
  });
  
  
  //set order to readyToDelivery
  router.route("/setOrderToReadyToDelivery/:id").put(async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Find the order by its ID and update the status to "readyToDelivery"
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: "readyToDelivery" } },
        { new: true } // To return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update order to readyToDelivery" });
    }
  });

  

  //get all ready to delivery orders
  router.route("/getAllReadyToDeliveryOrders").get(async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "readyToDelivery" });
  
      const formattedOrders = pendingOrders.map(order => {
        return {
          id: order._id,
          userId: order.userId,
          status: order.status,
          price: order.totalPrice.toFixed(2),
          paymentMethod: order.payment,
          date: order.datePlaced,
          shippingAddress: order.shippingAddress,
          contactNumber: order.contactNumber,
          orderDetails: order.products.map(product => ({
            productName: product.productName,
            productId: product.product,
            quantity: product.quantity,
            price: product.pricePerItem,
            totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
          }))
        };
      });
  
      res.status(200).json(formattedOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve ready to delivery orders" });
    }
  });




  //set order to onDelivery
  router.route("/setOrderToOnDelivery/:id").put(async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Find the order by its ID and update the status to "onDelivery"
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: "onDelivery" } },
        { new: true } // To return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update order to onDelivery" });
    }
  });



  //get all onDelivery orders
  router.route("/getAllOnDeliveryOrders").get(async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "onDelivery" });
  
      const formattedOrders = pendingOrders.map(order => {
        return {
          id: order._id,
          userId: order.userId,
          status: order.status,
          price: order.totalPrice.toFixed(2),
          paymentMethod: order.payment,
          date: order.datePlaced,
          shippingAddress: order.shippingAddress,
          contactNumber: order.contactNumber,
          orderDetails: order.products.map(product => ({
            productName: product.productName,
            productId: product.product,
            quantity: product.quantity,
            price: product.pricePerItem,
            totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
          }))
        };
      });
  
      res.status(200).json(formattedOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve onDelivery orders" });
    }
  });




  //set order to completed
  router.route("/setOrderToCompleted/:id").put(async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Find the order by its ID and update the status to "completed"
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { $set: { status: "completed" } },
        { new: true } // To return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update order to completed" });
    }
  });



  //get all completed orders
  router.route("/getAllCompletedOrders").get(async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: "completed" });
  
      const formattedOrders = pendingOrders.map(order => {
        return {
          id: order._id,
          userId: order.userId,
          status: order.status,
          price: order.totalPrice.toFixed(2),
          paymentMethod: order.payment,
          date: order.datePlaced,
          shippingAddress: order.shippingAddress,
          contactNumber: order.contactNumber,
          orderDetails: order.products.map(product => ({
            productName: product.productName,
            productId: product.product,
            quantity: product.quantity,
            price: product.pricePerItem,
            totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
          }))
        };
      });
      res.status(200).json(formattedOrders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to retrieve completed orders" });
    }
  });


//   router.get('/top-rated-products', async (req, res) => {
//     try {
//         const topProducts = await Feedback.aggregate([
//             {
//                 $group: {
//                     _id: "$Product",
//                     averageRating: { $avg: "$ratings" }
//                 }
//             },
//             {
//                 $sort: { averageRating: -1 } // Descending order by averageRating
//             },
//             {
//                 $limit: 4
//             }
//         ]);

//         const productIds = topProducts.map(product => product._id); // Extracting Product ObjectIds

//         // Fetch products based on the extracted Product ObjectIds
//         const products = await Product.find({ _id: { $in: productIds } });

//         // Send response with top rated products
//         res.json(products);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });


router.get('/top-rated-products', async (req, res) => {
  try {
      // Fetch 4 random products
      const products = await Product.aggregate([
          { $sample: { size: 4 } }
      ]);

      res.json(products);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
});





  

module.exports = router;
