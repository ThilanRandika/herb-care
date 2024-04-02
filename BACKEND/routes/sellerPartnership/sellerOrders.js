const router = require("express").Router();
const Seller = require("../../models/sellerPartnership/Seller.js");
const Product = require("../../models/inventory/Product.js");
const SellerBag = require("../../models/sellerPartnership/SellerBag.js");
const SellerOrder = require("../../models/sellerPartnership/SellerOrder.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");
const emailSender = require('../../emailSender');

//Press the place order button
router.route('/checkout').get(verifySellerToOther, async (req, res) => {
    try {
        const sellerId = req.person.sellerId;

        // Get address from seller table
        const seller = await Seller.findOne({ sellerId });

        // Get all products in the cart for the specific seller
        const sellerBags = await SellerBag.find({ sellerId }).populate('product_id');

        const totalPrice = sellerBags.reduce((total, item) => total + item.totalPrice, 0);
        
        // Initialize an object to store products grouped by seller
        const productsBySeller = {
            seller: {
                companyName: seller.company,
                email: seller.email,
                address: seller.address,
                totalPrice: totalPrice
            },
            products:[]
        };

        // Iterate through the sellerBags and group products by seller
        sellerBags.forEach(sellerBag => {
            const { product_id, price, totalPrice, quantity } = sellerBag;
            const { name, image_url } = product_id;

            // Create a new object for the seller if it doesn't exist
            // if (!productsBySeller[sellerId]) {
            //     productsBySeller[sellerId] = {
            //         address: sellerAddress,
            //         products: []
            //     };
            // }

            // Push product details to the seller's products array
            const product = {
                details: {
                    product_name: name,
                    product_image: image_url,
                },
                order: {
                    product_Id:  product_id,
                    product_price: price,
                    total_price: totalPrice,
                    quantity: quantity
                }
            };

            productsBySeller.products.push(product);
 
        });

        // Send the products grouped by seller as JSON response
        res.status(200).json(productsBySeller);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});




// 1. Place Order Functionality
router.route('/placeOrder').post(verifySellerToOther, async (req, res) => {
    try {
        const sellerId = req.person.sellerId;

        // Calculate total price of the order
        

        // Create a new SellerOrder document
        const newOrder = new SellerOrder({
            sellerId,
            products: req.body.products,
            totalPrice : req.body.seller.totalPrice,
            shippingAddress: req.body.seller.address,
            payment:  req.body.seller.payment// or any initial status
        });

        // Save the order to the database
        try{
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        }catch(err){
            console.log(err)
        }
        

        // Clear seller's bag by deleting all items
        await SellerBag.deleteMany({ sellerId });

        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to place order" });
    }
});

// // 2. Display Order Details for Confirmation
// router.route('/orderDetails').get(verifySellerToOther, async (req, res) => {
//     try {
//         const sellerId = req.person.sellerId;
//         const bagItems = await SellerBag.find({ sellerId }).populate('product_id');

//         // Prepare order details for display
//         const orderDetails = bagItems.map(item => ({
//             productName: item.product_id.name,
//             quantity: item.quantity,
//             pricePerItem: item.price,
//             totalPrice: item.totalPrice
//             // Add more fields if necessary
//         }));

//         res.status(200).json(orderDetails);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Failed to fetch order details" });
//     }
// });



//CREATE a new Order

// router.route('/pendingOrders').get(verifySellerToOther, async (req, res) => {
//     try {

//         const sellerId = req.person.sellerId;
//         // Find pending orders from SellerOrder model
//         const pendingOrders = await SellerOrder.find({ sellerId, status: 'pending' }).populate('products.product');

//         // Format the data according to the provided format
//         const formattedOrders = pendingOrders.map(order => {
//             return {
//                 id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
//                 customer: order.sellerId, // Assuming sellerId represents the customer in this context
//                 date: order.createdAt, // Assuming createdAt represents the order date
//                 price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
//                 status: order.status,
//                 orderDetails: order.products.map(product => ({
//                     productName: product.product.name,
//                     quantity: product.quantity,
//                     price: product.pricePerItem.toFixed(2),
//                     totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
//                 }))
//             };
//         });

//         res.status(200).json(formattedOrders);
//     } catch (error) {
//         console.error('Error fetching pending orders:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.route('/pendingOrders').get( async (req, res) => {
    try {
        // Find pending orders from SellerOrder model
        const pendingOrders = await SellerOrder.find({status: 'pending' }).populate('products.product');

        console.log(pendingOrders.map(order=>{order.products.product}));
        // Format the data according to the provided format
        const formattedOrders = pendingOrders.map(order => {
            return {
                id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
                customer: order.sellerId, // Assuming sellerId represents the customer in this context
                date: order.createdAt, // Assuming createdAt represents the order date
                price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
                status: order.status,
                orderDetails: order.products.map(product => ({
                    productName: product.product.name,
                    quantity: product.quantity,
                    price: product.pricePerItem.toFixed(2),
                    totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
                }))
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//UPDATE - approve partnership request to discussion
router.route('/acceptOrder/:id').put(async (req, res) => {
    try{
        const orderId = req.params.id;
        const updatedOrder = await SellerOrder.findByIdAndUpdate(orderId,  
            {$set: {'status': 'processing'}}, 
            {new: true} 
        );
        const orderedSeller =  await SellerOrder.findById(orderId);
        const seller = await Seller.findOne({sellerId : orderedSeller.sellerId});

        async function sendCustomEmail() {
            const receiver = seller.toJSON().email;
            const html =  `
            <b>Order Approved ${seller.toJSON().seller_name}</b> 
            <p>We are happy to be a partner with your company. <p>this is ouer contact details: Contact Number -  071256389, Email - herncare@gmail.com</p> <p>We contact you to discuss the futher details.</p><p>Thank You!</p>`;
            const subject = `To inform approvel of Order #${orderId} - HerbCare`;
          
            try {
              await emailSender.sendEmail(receiver, html, subject );
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
          sendCustomEmail();

        res.status(200).json(updatedOrder);
    }catch(err){
        console.log(err)
    }
});

router.route('/rejectPendingOrder/:id').delete(async(req, res) => {
    const orderId = req.params.id;
    try{

        const orderedSeller =  await SellerOrder.findById(orderId);
        const seller = await Seller.findOne({sellerId : orderedSeller.sellerId});

        async function sendCustomEmail() {
            const receiver = seller.toJSON().email;
            const html =  `
            <b>Order Rejected ${seller.toJSON().seller_name}</b> 
            <p>We are happy to be a partner with your company. <p>this is ouer contact details: Contact Number -  071256389, Email - herncare@gmail.com</p> <p>We contact you to discuss the futher details.</p><p>Thank You!</p>`;
            const subject = `To inform reject of Order #${orderId} - HerbCare`;
          
            try {
              await emailSender.sendEmail(receiver, html, subject );
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
          sendCustomEmail();

        await SellerOrder.findByIdAndDelete(orderId)
        res.status(200).json("Deleted the order");
    }catch(err){
        console.log(err);
    }
});


router.route('/processingOrders').get( async (req, res) => {
    try {
        // Find pending orders from SellerOrder model
        const processingOrders = await SellerOrder.find({status: 'processing' }).populate('products.product');

        console.log(processingOrders.map(order=>{order.products.product}));
        // Format the data according to the provided format
        const formattedOrders = processingOrders.map(order => {
            return {
                id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
                customer: order.sellerId, // Assuming sellerId represents the customer in this context
                date: order.createdAt, // Assuming createdAt represents the order date
                price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
                status: order.status,
                orderDetails: order.products.map(product => ({
                    productName: product.product.name,
                    quantity: product.quantity,
                    price: product.pricePerItem.toFixed(2),
                    totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
                }))
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching processing orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//UPDATE - approve partnership request to discussion
router.route('/readyToDelivery/:id').put(async (req, res) => {
    try{
        const orderId = req.params.id;
        const updatedOrder = await SellerOrder.findByIdAndUpdate(orderId,  
            {$set: {'status': 'readyToDelivery'}}, 
            {new: true} 
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        console.log(err)
    }
});

router.route('/readyToDeliveryOrders').get( async (req, res) => {
    try {
        // Find pending orders from SellerOrder model
        const readyToDeliveryOrders = await SellerOrder.find({status: 'readyToDelivery' }).populate('products.product');

        console.log(readyToDeliveryOrders.map(order=>{order.products.product}));
        // Format the data according to the provided format
        const formattedOrders = readyToDeliveryOrders.map(order => {
            return {
                id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
                customer: order.sellerId, // Assuming sellerId represents the customer in this context
                date: order.createdAt, // Assuming createdAt represents the order date
                price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
                status: order.status,
                orderDetails: order.products.map(product => ({
                    productName: product.product.name,
                    quantity: product.quantity,
                    price: product.pricePerItem.toFixed(2),
                    totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
                }))
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching readyToDelivery orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//UPDATE - approve partnership request to discussion
router.route('/onDelivery/:id').put(async (req, res) => {
    try{
        const orderId = req.params.id;
        const updatedOrder = await SellerOrder.findByIdAndUpdate(orderId,  
            {$set: {'status': 'onDelivery'}}, 
            {new: true} 
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        console.log(err)
    }
});

router.route('/onDeliveryOrders').get( async (req, res) => {
    try {
        // Find pending orders from SellerOrder model
        const onDeliveryOrders = await SellerOrder.find({status: 'onDelivery' }).populate('products.product');

        console.log(onDeliveryOrders.map(order=>{order.products.product}));
        // Format the data according to the provided format
        const formattedOrders = onDeliveryOrders.map(order => {
            return {
                id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
                customer: order.sellerId, // Assuming sellerId represents the customer in this context
                date: order.createdAt, // Assuming createdAt represents the order date
                price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
                status: order.status,
                orderDetails: order.products.map(product => ({
                    productName: product.product.name,
                    quantity: product.quantity,
                    price: product.pricePerItem.toFixed(2),
                    totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
                }))
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching onDelivery orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.route('/completed/:id').put(async (req, res) => {
    try{
        const orderId = req.params.id;
        const updatedOrder = await SellerOrder.findByIdAndUpdate(orderId,  
            {$set: {'status': 'completed'}}, 
            {new: true} 
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        console.log(err)
    }
});

router.route('/completedOrders').get( async (req, res) => {
    try {
        // Find pending orders from SellerOrder model
        const completedOrders = await SellerOrder.find({status: 'completed' }).populate('products.product');

        console.log(completedOrders.map(order=>{order.products.product}));
        // Format the data according to the provided format
        const formattedOrders = completedOrders.map(order => {
            return {
                id: order._id, // Assuming MongoDB automatically generates IDs for SellerOrder
                customer: order.sellerId, // Assuming sellerId represents the customer in this context
                date: order.createdAt, // Assuming createdAt represents the order date
                price: order.totalPrice.toFixed(2), // Assuming totalPrice is a number
                status: order.status,
                orderDetails: order.products.map(product => ({
                    productName: product.product.name,
                    quantity: product.quantity,
                    price: product.pricePerItem.toFixed(2),
                    totalPrice: (product.quantity * product.pricePerItem).toFixed(2)
                }))
            };
        });

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching completed orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;