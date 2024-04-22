const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const ApprovalProcess= require("../../models/inventory/ApprovalProcess");


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
    const { name, category, description, price, Manufactured_price, discount, quantity, expireDate, manufactureDate, ingredients } = req.body;

    // File path of the uploaded image
    const image = req.file.filename;

    // Create a new product instance
    const newApprovalProcess = new ApprovalProcess({
      name, category, description, price, Manufactured_price, discount, quantity, image, expireDate, manufactureDate, ingredients,
      action: 'Add' // Set action to "Add"
    });

    // Save the new product to the database
    await newApprovalProcess.save();

    // Respond with success message
    res.json({ message: 'Product added successfully' });
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

// Route to update the status of a proposal
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

    // Send different response messages based on the updated status
    let message = "";
    if (status === "Approved") {
      message = "Product Proposal Approved";
    } else if (status === "Rejected") {
      message = "Product Proposal Rejected";
    }

    res.json({ message, updatedProposal });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ error: 'Failed to update proposal status' });
  }
});


module.exports = router;
