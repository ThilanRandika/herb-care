const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PDFDocument = require("pdfkit");
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

    let image = ''; // Initialize image variable

    // Check if a file is uploaded
    if (req.file) {
      // If file is uploaded, use the uploaded image
      image = req.file.filename;

      // Delete the previous image file if it exists
      if (product.image) {
        fs.unlinkSync(`uploads/${product.image}`); // Delete previous image file
      }
    } else {
      // If no file uploaded, fetch previous image from the database
      image = product.image ; // Use the previous image or empty string if no previous image exists
    }

    // Prepare the updated product data
    let updateProduct = {
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients
    };

    // Update the product in the database
    await Product.findOneAndUpdate({ _id: productId}, updateProduct);
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

   /* // Delete associated image file
    if (product.image) {
      fs.unlinkSync(`uploads/${product.image}`); // Delete image file
    }*/

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




router.get("/generateReport", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});

    // Create a new PDF document
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("report.pdf")); // Save PDF to file

    // Add products data to the PDF
    doc.fontSize(12).text("Product Report", { align: "center" });
    doc.moveDown();

    // Create table header
    const tableHeaders = ["Product Name", "Category", "Description", "Price", "Manufactured Price", "Discount", "Quantity", "Image", "Expire Date", "Manufacture Date", "Ingredients"];
    doc.table([tableHeaders], { headerRows: 1 });

    // Add products to the table
    products.forEach(product => {
      const rowData = [
        product.name,
        product.category,
        product.description,
        product.price,
        product.Manufactured_price,
        product.discount,
        product.quantity,
        product.image,
        product.expireDate,
        product.manufactureDate,
        product.ingredients
      ];
      doc.table([rowData], { headerRows: 0 });
    });

    // Finalize the PDF document
    doc.end();

    // Send the generated PDF file as a response
    res.download("report.pdf");
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
