const router = require("express").Router();
let DefaultGiftPack = require("../../modles/GiftPackage/defaultGiftpackage");

// From gift package adding form, by Staff
// Create default gift packagesand add them
router.route("/addDefault-gift-package").post(async (req,res)=>{

    //requesting body data contaning value creating
    const defaultGiftPack = new DefaultGiftPack({
        packageName: req.body.packageName,
        description: req.body.description,
        products: req.body.products,
        totalPrice: req.body.totalPrice
      });

      try {
        const newDefaultGiftPack = await defaultGiftPack.save();
        res.status(201).json({ message: "Default gift package Added!"});
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
     
    /*
    //requesting body data contaning value creating
    const packageName = req.body.packageName;
    const description = req.body.description;
    const products = req.body.products;
    const totalPrice = Number(req.body.totalPrice);
    
    const newDefaultGiftPack = new DefaultGiftPack({
        packageName,
        description,
        products,
        totalPrice
      });
    
    //Display adding process is success or not
    DefaultGiftPack.save().then(()=>{
        //process is success
        res.json("Package added")
    }).catch((err)=>{
        console.log(err); // if process is unsuccessful
    })*/

})


// Display added all default gift packages
router.route("/default-gift-package").get(async(req,res)=>{

    try {
        const defaultGiftPackages = await DefaultGiftPack.find();
        res.json(defaultGiftPackages);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

    /*
    DefaultGiftPack.find().then((defaultGiftPackages)=>{
        //Successfully display default gift packages
        res.json(defaultGiftPackages)
    }).catch((err)=>{
        console.log(err) //display error msg if the process is unsuccessful
    })
    */
})

//After select a package system will display package details
// Display a single default gift package
router.route("/default-gift-packages/:id").get(async (req, res) => {
    try {
      const defaultGiftPack = await DefaultGiftPack.findById(req.params.id);
      if (defaultGiftPack == null) {
        return res.status(404).json({ message: "Default gift package not found"});
      }
      res.json(defaultGiftPack);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    /*
    let packageId = req.params.id; //get id value from the parameter

    const package = await DefaultGiftPack.findById(packageId).then(()=>{
        res.status(200).send({status: "Package Found", package: package});
    }).catch((err)=>{
        res.status(500).send({status: "Error with Finding package", error: err.message});
    })
    */

});


// Staff can update default package details
// Update added default gift packages
router.route("/updateDefault-gift-package/:id").put(async(req,res)=>{
    
    try {
        const updatedDefaultGiftPack = await DefaultGiftPack.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Package updated successfully"});
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    /*
    let packageId = req.params.id; //get id value from the parameter

    //body data
    const{packageName, description, products, totalPrice} = req.body;

    //updadted values
    const updatedDefaultGiftPack = {
        packageName, 
        description, 
        products, 
        totalPrice
    }

    const update = await DefaultGiftPack.findByIdAndUpdate(packageId, updatedDefaultGiftPack).then(()=>{
        res.status(200).send({status: "Package Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(200).send({status: "Error witg updating data"});
    })
    */
    
}) 


// Staff can delete default packages
// Delete package
router.route("/deleteDefault-gift-packages/:id").delete(async (req, res) => {
    try {
      await DefaultGiftPack.findByIdAndDelete(req.params.id);
      res.json({ message: 'Default gift package deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    /*
    let packageId = req.params.id; //get id value from the parameter
    
    await DefaultGiftPack.findByIdAndDelete(packageId).then(()=>{
        res.status(200).send({status: "Package Deleted! "});
    }).catch((err)=>{
        res.status(500).send({status: "Error with deleting package", error: err.message});
    })
    */
});

module.exports = router;