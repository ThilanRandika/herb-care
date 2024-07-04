const Customer = require("../../models/user/Customer");
const bcrypt = require("bcryptjs");
const { verifyToOther } = require("../../utils/veryfyToken");
const router = require("express").Router();

//CREATE - register customer
router.route('/register').post(async (req,res) => {
    try{

        const {password, ...others} = req.body;

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        
        const newCustomer = new Customer({...others, password: hash});

        const savedCustomer = await newCustomer.save();
        res.status(200).json(savedCustomer);
    } catch(err){
        console.log(err);
    }
});

// Route to get all customer details
router.get("/customer_details", verifyToOther, async (req, res) => {
    try {
      const customer = await Customer.findById(req.person.userId, 'customer_name email address contact_num');
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;