const Product = require("../../models/inventory/Product.js");
const router = require("express").Router();
const Cart = require("../../models/order/Cart.js");

// Route to add a product to the cart
router.post('/add', async (req, res) => {
  try {
    // Extract product ID and quantity from the request body
    const { productId, quantity, productname } = req.body;

    // Calculate total price (assuming product price is stored in the database)
    const product = await Product.findById(productId);
    const totalPrice = product.price * quantity;

    // Create a new Cart document
    const cartItem = new Cart({
      product_id: productId,
      name:productname,
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
    res.status(500).json({ error: error});
  }
});


router.post('/allcart', async (req, res) => {
  try {
    // Fetch all items from the cart
    const items = await Cart.find({});

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.totalPrice; // Assuming there's a 'price' field in your Cart schema
    }

    // Add total price to the response JSON
    const response = {
      items: items,
      totalPrice: totalPrice
    };

    // Send response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching items from cart:", error);
    throw error;
  }
});


router.post('/remove/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const removedItem = await Cart.findOneAndDelete({ _id: productId });
    if (!removedItem) {
      res.json({ message: "Item removed from cart successfully." });
    }
    // return { message: "Item removed from cart successfully." };
    res.json({ message: "Item removed from cart successfully." });
  } catch (error) {
    res.json({ message: "Error removing item from cart." });
  }
});


router.post('/update/:id', async (req, res) => {
  const productId = req.params.id;
  const pssquantity = req.body.quantity;
  try {
    const updatedItem = await Cart.findByIdAndUpdate(productId, { quantity: pssquantity }, { new: true });
    if (!updatedItem) {
      return res.json({ message: "Item not found in cart." });
    }
    res.json({ message: "Item quantity updated successfully.", item: updatedItem });
  } catch (error) {
    res.json({ message: "Error updating quantity of item in cart." });
  }
});












module.exports = router;