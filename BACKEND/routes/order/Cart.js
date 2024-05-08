const Product = require("../../models/inventory/Product.js");
const router = require("express").Router();
const Cart = require("../../models/order/Cart.js");

// Route to add a product to the cart
router.post('/add', async (req, res) => {
    try {
      // Extract product ID and quantity from the request body
      const { productId, quantity } = req.body;
  
      // Calculate total price (assuming product price is stored in the database)
      const product = await Product.findById(productId);
      const totalPrice = product.price * quantity;
  
      // Create a new Cart document
      const cartItem = new Cart({
        product_id: productId,
        quantity: quantity,
        totalPrice: totalPrice,
        status: 'inBag', // Assuming default status is 'inBag'
      });
  
      // Save the cart item to the database
      const savedCartItem = await cartItem.save();
  
      // Respond with the saved cart item
      res.status(200).json({ message: 'Product added to cart successfully', cartItem: savedCartItem });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });












module.exports = router;