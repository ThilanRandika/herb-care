const router = require("express").Router();
const Seller = require("../../models/sellerPartnership/Seller.js");
const Product = require("../../models/Product.js");
const SellerBag = require("../../models/sellerPartnership/SellerBag.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");

//Press the place order button
router.route('/placeorder').post(verifySellerToOther, async (req, res) => {
    try {
        const sellerId = req.person.sellerId;

        // Get address from seller table
        const seller = await Seller.findOne({ sellerId });
        const sellerAddress = seller.address;

        // Get all products in the cart for the specific seller
        const sellerBags = await SellerBag.find({ sellerId }).populate('product_id');
        
        // Initialize an object to store products grouped by seller
        const productsBySeller = {};

        // Iterate through the sellerBags and group products by seller
        sellerBags.forEach(sellerBag => {
            const { product_id, price, totalPrice, quantity } = sellerBag;
            const { name, image_url } = product_id;

            // Create a new object for the seller if it doesn't exist
            if (!productsBySeller[sellerId]) {
                productsBySeller[sellerId] = {
                    address: sellerAddress,
                    products: []
                };
            }

            // Push product details to the seller's products array
            productsBySeller[sellerId].products.push({
                product_name: name,
                product_image: image_url,
                product_price: price,
                total_price: totalPrice,
                quantity: quantity
            });
        });

        // Send the products grouped by seller as JSON response
        res.status(200).json(productsBySeller);

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


//CREATE a new Order




module.exports = router;