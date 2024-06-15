const Product = require("../../models/inventory/Product.js");
const router = require("express").Router();
const Cart = require("../../models/order/Cart.js");
const { verifyToOther } = require("../../utils/veryfyToken.js");

// // Route to add a product to the cart
// router.post('/add', async (req, res) => {
//   try {
//     // Extract product ID and quantity from the request body
//     const { productId, quantity, productname } = req.body;

//     // Calculate total price (assuming product price is stored in the database)
//     const product = await Product.findById(productId);
//     const totalPrice = product.price * quantity;

//     // Create a new Cart document
//     const cartItem = new Cart({
//       product_id: productId,
//       name:productname,
//       quantity: quantity,
//       totalPrice: totalPrice,
//       status: 'inBag', // Assuming default status is 'inBag'
//     });

//     // Save the cart item to the database
//     const savedCartItem = await cartItem.save();

//     // Respond with the saved cart item
//     res.status(200).json({ message: 'Product added to cart successfully', cartItem: savedCartItem });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ error: error});
//   }
// });


//Add product to the bag
router.route('/add/:productId').post(verifyToOther, async (req,res) => {
  try{
      const userId = req.person.userId;
      const productId = req.params.productId;

      const existingCartItem = await Cart.findOne({ customerId: userId, product_id: productId });

      if (existingCartItem) {
          // If the product already exists in the user's bag, update its quantity
          existingCartItem.quantity += req.body.quantity; // Increase the quantity
          existingCartItem.totalPrice = (existingCartItem.quantity * existingCartItem.price).toFixed(2); // Recalculate total price
          await existingCartItem.save(); // Save the updated item
          res.status(200).json(existingCartItem);
      } else {
          // If the product does not exist in the seller's bag, add it as a new item
          const newCartItem = new Cart({customerId: userId, product_id: productId, ...req.body });
          const savedCartItem = await newCartItem.save();  
          res.status(200).json(savedCartItem);   
      }
  } catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
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


router.delete('/remove/:id', async (req, res) => {
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


// Update item quantity in cart
router.put('/update/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(itemId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update the quantity and total price
    cartItem.quantity = quantity;
    cartItem.totalPrice = (cartItem.price * quantity).toFixed(2);

    // Save the updated item
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// New route to get cart items for a specific user
router.get('/user/:customerId', async (req, res) => {
  const customerId = req.params.customerId;
  try {
    // Fetch all items from the cart for the specified user
    const items = await Cart.find({ customerId });

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.totalPrice;
    }

    // Add total price to the response JSON
    const response = {
      items: items,
      totalPrice: totalPrice
    };

    // Send response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching items from cart for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;