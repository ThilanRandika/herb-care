const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require("../../models/inventory/Product");
// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded image
  }
});

// Multer file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to add a product with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    // Extract product data from request body
    const { name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients } = req.body;

    // File path of the uploaded image
    const image = req.file.filename;

    // Create a new product instance
    const newProduct = new Product({
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients
    });

    // Save the new product to the database
    await newProduct.save();

    // Respond with success message
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Update a product with image upload
router.put("/update/:id", upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    // Delete the previous image file if it exists
    if (product.image) {
      fs.unlinkSync(`uploads/${product.image}`); // Delete previous image file
    }

    // Prepare the updated product data
    let updateProduct = {
      name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients
    };

    // Update image if a new image is uploaded
    if (req.file) {
      updateProduct.image = req.file.filename;
    }

    // Update the product in the database
    await Product.findByIdAndUpdate(productId, updateProduct);
    res.status(200).send({ status: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});





// Remove product and associated image file
router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    // Delete associated image file
    if (product.image) {
      fs.unlinkSync(`uploads/${product.image}`); // Delete image file
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).send({ status: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error with delete product" });
  }
});


// Route to get all products with file paths
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    // Map each product to include the file path
    const productsWithFilePaths = products.map(product => ({
      _id: product._id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      Manufactured_price: product.Manufactured_price,
      discount: product.discount,
      quantity: product.quantity,
      image: product.image, // Use the image directly
      expireDate: product.expireDate,
      manufactureDate: product.manufactureDate,
      ingredients: product.ingredients
    }));
    res.json(productsWithFilePaths);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a product by ID with file path
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Include file path in response
    const productWithFilePath = {
      _id: product._id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      Manufactured_price: product.Manufactured_price,
      discount: product.discount,
      quantity: product.quantity,
      image: product.image, // Use the image directly
      expireDate: product.expireDate,
      manufactureDate: product.manufactureDate,
      ingredients: product.ingredients
    };
    res.json({ product: productWithFilePath }); // Wrap product in an object and send
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
module.exports = router;
