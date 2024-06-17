const Product = require("../../models/inventory/Product.js");
const router = require("express").Router();
const Cart = require("../../models/order/Cart.js");

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
router.route('/add/:productId').post( async (req,res) => {
  try{
      const userId = req.body.userId;
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

    const productIds = items.map((product) => product.product_id);

    const mergedItems = [];

    // Calculate total price
    // let totalPrice = 0;
    // for (const item of items) {
    //   totalPrice += item.totalPrice;
    // }

    for (const productId of productIds) {
      const product = await Product.findById(productId);
  
      console.log(productId);
  
      if (product) {
        const cartItem = await Cart.findOne({
          product_id: productId,
          customerId: customerId,
        });
  
        mergedItems.push({
          ...product._doc,
          item_id: cartItem._id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          totalPrice: cartItem.totalPrice,
        });
  
      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    }

    // Send response
    res.status(200).json(mergedItems);
  } catch (error) {
    console.error("Error fetching items from cart for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.route('/checkout').get(async (req, res) => {
  try {
      const selectedItems = req.query.selectedItems;
      console.log(selectedItems)

      // Get all products in the cart for the specific seller
      const cart = await Cart.find({ _id: { $in: selectedItems } }).populate('product_id');
      const itemCount =  cart.length;

      const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
      
      // Initialize an object to store products grouped by seller
      const products = {
          cart: {
              itemCount: itemCount,
              totalPrice: totalPrice
          },
          products:[]
      };

      // Iterate through the sellerBags and group products by seller
      cart.forEach(cart => {
          const { product_id, price, totalPrice, quantity } = cart;
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

          products.products.push(product);

      });

      // Send the products grouped by seller as JSON response
      res.status(200).json(products);

  } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
  }
});




module.exports = router;