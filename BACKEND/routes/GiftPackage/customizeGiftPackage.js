// http://localhost:8070/customizeGiftPackage

const router = require("express").Router();
const CustomizeGiftPackage = require("../../models/GiftPackage/customizeGiftPackage")
const Product = require("../../models/inventory/Product")


// Create a custom gift package
router.post('/addCustomGiftPackages', async (req, res) => {
    try {
      const { customerId, packageName, products } = req.body;
  
      // Check if all product IDs provided are valid
      const validProducts = await Product.find({ _id: { $in: products } });
      if (validProducts.length !== products.length) {
        return res.status(400).json({ message: 'Invalid product IDs' });
      }
  
      const customGiftPack = new CustomizeGiftPackage({
        customerId,
        packageName,
        products,
      });
  
      await customGiftPack.save();
  
      res.status(201).json({message: "Package created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });


  
  // Get details of a custom gift package
  router.get('/customGiftPackages/:id', async (req, res) => {
    try {
      const customGiftPack = await CustomizeGiftPackage.findById(req.params.id).populate('products'); 
  
      if (!customGiftPack) {
        return res.status(404).json({ message: "Custom gift package not found" });
      }
  
      res.status(200).json(customGiftPack);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });  


  
  // Update a custom gift package
  router.put('/updateCustomGiftPackages/:id', async (req, res) => {
    try {
      const { packageName, products } = req.body;
  
      const customGiftPack = await CustomizeGiftPackage.findById(req.params.id);
  
      if (!customGiftPack) {
        return res.status(404).json({ message: "Custom gift package not found" });
      }
  
      customGiftPack.packageName = packageName;
      customGiftPack.products = products;
  
      await customGiftPack.save();
  
      res.status(200).json({message: "Package updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  
  
  // Delete a custom gift package
  router.delete('/deleteCustomGiftPackages/:id', async (req, res) => {
    try {
      await CustomizeGiftPackage.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "Custom gift package deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });


module.exports = router;