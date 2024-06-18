const Product = require("../../models/inventory/Product.js");
const SellerBag = require("../../models/sellerPartnership/SellerBag.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");
const router = require("express").Router();

//Add product to the bag
router.route('/addToBag/:productId/:sellerId').post( async (req,res) => {
  try{
      const sellerId = req.params.sellerId;
      const productId = req.params.productId;

      const existingBagItem = await SellerBag.findOne({ sellerId: sellerId, product_id: productId });

      if (existingBagItem) {
          // If the product already exists in the seller's bag, update its quantity
          existingBagItem.quantity += req.body.quantity; // Increase the quantity
          existingBagItem.totalPrice = (existingBagItem.quantity * existingBagItem.price).toFixed(2); // Recalculate total price
          await existingBagItem.save(); // Save the updated item
          res.status(200).json(existingBagItem);
      } else {
          // If the product does not exist in the seller's bag, add it as a new item
          const newBagItem = new SellerBag({ sellerId: sellerId, product_id: productId, ...req.body });
          const savedBagItem = await newBagItem.save();  
          res.status(200).json(savedBagItem);   
      }
  } catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//View all bag Items for logged seller
router.route('/allBag/:sellerId').get( async (req, res) => {
    try{
        const sellerId = req.params.sellerId;

        const bagItems = await SellerBag.find({sellerId: sellerId});

    const productIds = bagItems.map((product) => product.product_id);

    const mergedItems = [];

    for (const productId of productIds) {
      const product = await Product.findById(productId);

      console.log(productId);

      if (product) {
        const bagItem = await SellerBag.findOne({
          product_id: productId,
          sellerId: sellerId,
        });

        mergedItems.push({
          ...product._doc,
          item_id: bagItem._id,
          quantity: bagItem.quantity,
          price: bagItem.price,
          totalPrice: bagItem.totalPrice,
        });

      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    }

        res.status(200).json(mergedItems);
    }catch(err){
        console.log(err);
    }
});


router.route('/updateQuantity/:itemId').put( async (req, res) => {
  try {
      const itemId = req.params.itemId;
      const { quantity } = req.body;

      const bagItem = await SellerBag.findById(itemId);

      if (!bagItem) {
          return res.status(404).json({ error: 'Bag item not found' });
      }

      // Update the quantity and total price
      bagItem.quantity = quantity;
      bagItem.totalPrice = (bagItem.price * quantity).toFixed(2);


      // Save the updated item
      await bagItem.save();

      res.status(200).json(bagItem);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


//Delete Bag Item
router.route('/deleteItem/:bagId').delete(async(req, res) => {
    try{
        const bagId = req.params.bagId;

        await SellerBag.findByIdAndDelete(bagId)

        res.status(200).json("Deleted the Item");
    }catch(err){
        console.log(err);
    }
});






module.exports = router;