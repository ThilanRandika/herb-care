const router = require("express").Router();
const Seller = require("../../models/sellerPartnership/Seller.js");
const Product = require("../../models/inventory/Product.js");
const SellerBag = require("../../models/sellerPartnership/SellerBag.js");
const SellerOrder = require("../../models/sellerPartnership/SellerOrder.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");

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




module.exports = router;