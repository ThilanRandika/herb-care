const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ApprovalProcess= require("../../models/inventory/ApprovalProcess");
const Product = require("../../models/inventory/Product");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Destination folder for storing images
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
router.post('/addProposal', upload.single('image'), async (req, res) => {
  try {
    // Extract product data from request body
    const { name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients,action ,ProductID} = req.body;

    // File path of the uploaded image
    const image = req.file.filename;

    // Create a new product instance
    const newApprovalProcess = new ApprovalProcess({
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients,action,ProductID
      
    });

    // Save the new product to the database
    await newApprovalProcess.save();

    // Respond with success message
    res.json({ message: 'Product add proposal added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Route to add delete products by staff 
router.post('/addDelete', async (req, res) => {
  try {
    // Extract product data from request body
    const { name, category, description, price, Manufactured_price, discount, quantity,image, expireDate, manufactureDate, ingredients,action ,ProductID} = req.body;

    

    // Create a new product instance
    const newApprovalProcess = new ApprovalProcess({
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients,action,ProductID
      
    });

    // Save the new product to the database
    await newApprovalProcess.save();

    // Respond with success message
    res.json({ message: 'Product delete proposal added successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to update a product with image upload or fetch previous image
router.post('/updateProposal', upload.single('image'), async (req, res) => {
  try {
    // Extract product data from request body
    const { name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients, action, ProductID } = req.body;

    let image = ''; // Initialize image variable

    // Check if a file is uploaded
    if (req.file) {
      // If file is uploaded, use the uploaded image
      image = req.file.filename;
    } else {
      // If no file uploaded, fetch previous image from the database
      const previousProduct = await Product.findById(ProductID);
      if (previousProduct) {
        image = previousProduct.image; // Use the previous image
      } else {
        throw new Error('Previous product not found');
      }
    }

    // Create a new product instance
    const newUpdateApprovalProcess = new ApprovalProcess({
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients, action, ProductID
    });

    // Save the new product to the database
    await newUpdateApprovalProcess.save();

    // Respond with success message
    res.json({ message: 'Product Update Proposal Added Successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Route to get all product approvals
router.get('/', async (req, res) => {
  try {
    // Fetch all product approvals from the database
    const approvals = await ApprovalProcess.find();
    // Return the product approvals as a response
    res.json(approvals);
  } catch (error) {
    // Handle errors
    console.error('Error fetching product approvals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Route to get a single product approval by ID
router.get('/:id', async (req, res) => {
  try {
    // Find the product approval by ID
    const approval = await ApprovalProcess.findById(req.params.id);
    if (!approval) {
      return res.status(404).json({ message: 'Approval not found' });
    }
    // Return the approval as a response
    res.json(approval);
  } catch (error) {
    // Handle errors
    console.error('Error fetching product approval:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update the status of the proposal in the database
    const updatedProposal = await ApprovalProcess.findByIdAndUpdate(
      id,
      { status: status },
      { new: true } // Return the updated proposal
    );
    
    // Find the product by ID
    const ApprovedProduct = await ApprovalProcess.findById(id);

    const Real_Productid = ApprovedProduct.ProductID;
    const action = ApprovedProduct.action;


    // Check if status is "Approved" and action is "Update" to update the product in the Product database
    if (status === "Approved" && action === "Update") {
      const { name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients } = ApprovedProduct;

      // Create a new product instance with the image filename
      const updateProduct = {
        name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients
      };

      // Update the product in the database using findOneAndUpdate
      await Product.findOneAndUpdate({ _id: Real_Productid }, updateProduct);
    }
    
    if (status === "Approved" && action === "Remove") {
      // Delete the product from the database
      await Product.findOneAndDelete({ _id: Real_Productid });
    }
    // Check if status is "Approved" and action is "Add" to add the product to the Product database
    if (status === "Approved" && action === "Add") {
      const { name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients } = ApprovedProduct;

      // Create a new product instance with the image filename
      const newProduct = new Product({
        name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients
      });

      // Save the new product to the database
      await newProduct.save();
    }

    res.json({ message: 'Product updated/added successfully', updatedProposal });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ error: 'Failed to update proposal status' });
  }
});



module.exports = router;
