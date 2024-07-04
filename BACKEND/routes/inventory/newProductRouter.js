const express = require('express');
const router = express.Router();
const Product = require("../../models/inventory/Product");

// Add a new product
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// // Get all products
// router.get('/getAll', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to retrieve products' });
//   }
// });

// // Get a specific product by ID
// router.get('/getProduct/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to retrieve product' });
//   }
// });

// // Update a product by ID
// router.put('/updateProduct/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update product' });
//   }
// });

// // Delete a product by ID
// router.delete('/deleteProduct/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to delete product' });
//   }
// });

module.exports = router;
