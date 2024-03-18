const Customer = require("../../models/user/Customer");
const bcrypt = require("bcryptjs");

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

module.exports = router;