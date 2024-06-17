const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs'); // For password hashing
const Seller = require('../../models/sellerPartnership/Seller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads/images'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  // Initialize multer instance with the storage options
  const upload = multer({ storage: storage });

// Update route for user profile
router.post('/update', upload.single('avatar'), async (req, res) => {
  try {
    const { userId, name, email, company, companyDescription, taxId, address, phone, website, newPassword } = req.body;

    // Find the user by userId
    let seller = await Seller.findOne({sellerId : userId});

    // Update seller fields
    seller.seller_name = name;
    seller.email = email;
    seller.company = company;
    seller.company_discription = companyDescription;
    seller.tax_id = taxId;
    seller.address = address;
    seller.contact_num = phone;
    seller.website = website;

    // Handle password change
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      seller.password = hashedPassword;
    }

    // Handle avatar upload
    if (req.file) {
      // Here you can save the file path to the seller document or any other logic you prefer
      seller.profile_Image = req.file.filename;
    }

    // Save the updated seller
    await seller.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.route('/profile/:sellerId').get( async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Use await to ensure the result is resolved before proceeding
    const seller = await Seller.findOne({ sellerId: sellerId });

    // Check if seller exists
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Send only necessary data without circular references
    const sellerData = {
      sellerId: seller.sellerId,
      email: seller.email,
      seller_name: seller.seller_name,
      company: seller.company,
      company_discription: seller.company_discription,
      address: seller.address,
      contact_num: seller.contact_num,
      website: seller.website,
      profile_Image: seller.profile_Image,
      tax_id: seller.tax_id,
    };

    console.log(sellerData);
    // Send the modified data as JSON response
    res.status(200).json(sellerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
