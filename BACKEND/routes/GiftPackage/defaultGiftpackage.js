// http://localhost:8070/defaultGiftpackage

const router = require("express").Router();
const DefaultGiftPack = require("../../models/GiftPackage/defaultGiftpackage");
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { verifyToOther } = require("../../utils/veryfyToken");


// Image uploading
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
 
const upload = multer({ storage: storage });


// Fetch available products
/*router.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});*/

// From gift package adding form, by Staff
// Create default gift packagesand add them
router.route("/addDefault-gift-package").post(upload.array('images', 10), async (req, res) => {
  try {
      const { packageName, description, products, totalPrice } = req.body;
      const images = req.files.map(file => file.filename);


      // Fetch products by IDs
      //const productObjectIds=productIds.map(productId=>mongoose.Types.ObjectId(productId));

      const newDefaultGiftPack = new DefaultGiftPack({
          packageName,
          description,
          products,
          totalPrice,
          images
      });

      const savedDefaultGiftPack = await newDefaultGiftPack.save();

      res.status(201).json({ message: "Package added successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});


// Display added all default gift packages to staff
// Display all default gift packages to customer
router.route("/default-gift-packages").get(async(req,res)=>{

  try {
      const defaultGiftPackages = await DefaultGiftPack.find();
      res.json(defaultGiftPackages);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }


})

//After select a package system will display package details
// Display a single default gift package
router.route("/default-gift-pack/:id").get(async (req, res) => {
    try {
      const defaultGiftPack = await DefaultGiftPack.findById(req.params.id);
      if (defaultGiftPack == null) {
        return res.status(404).json({ message: "Default gift package not found"});
      }
      res.json(defaultGiftPack);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

});

//Single product
router.get('/:packageId', async (req, res) => {
  try {
      const packageId = req.params.packageId;
      if (!packageId) {
          return res.status(400).json({ message: 'Package ID is required' });
      }
      
      const giftPackage = await DefaultGiftPack.findById(packageId);
      if (!giftPackage) {
          return res.status(404).json({ message: 'Package not found' });
      }
      
      res.status(200).json(giftPackage);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});




// Staff can update default package details
// Update added default gift packages
router.route("/updateDefault-gift-package/:id").put(async(req, res) => {
  try {
    const { packageName, description, products, totalPrice } = req.body;

    // Check if all required fields are provided
    if (!packageName || !description || !products) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedDefaultGiftPack = await DefaultGiftPack.findByIdAndUpdate(req.params.id, {
      packageName,
      description,
      products,
      totalPrice
    }, { new: true });

    if (!updatedDefaultGiftPack) {
      return res.status(404).json({ message: "Default gift package not found" });
    }

    res.status(200).json({ message: "Package updated", updatedDefaultGiftPack });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
    
    /*try {
        const updatedDefaultGiftPack = await DefaultGiftPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Package updated successfully"});
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }*/

    


// Staff can delete default packages
// Delete package
router.route("/deleteDefault-gift-packages/:id").delete(async (req, res) => {
    try {
      await DefaultGiftPack.findByIdAndDelete(req.params.id);
      res.json({ message: 'Default gift package deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
});

module.exports = router;