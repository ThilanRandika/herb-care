const router = require('express').Router();
const bcrypt = require ('bcryptjs');
const Seller = require('../models/sellerPartnership/Seller');
const SellerProducts = require('../models/sellerPartnership/SellerProducts');
const jwt  = require("jsonwebtoken");
const Customer = require('../models/user/Customer');
const Staff = require('../models/staff/staff');
const Specialist = require('../models/consultation/Specialist');
const Manager = require('../models/manager/manager');

/*
//Seller Login
router.route('/login').post(async (req, res) => {
    try {
      const seller = await Seller.findOne({ sellerId : req.body.username });
      if (!seller) return res.status(500).json( 'No user found' );
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        seller.password
      );
      if (!isPasswordCorrect)
        return res.status(500).json( {"message": "Wrong password"} ); 
  
      const token = jwt.sign(
        { sellerId: seller.sellerId },
        process.env.JWT
      );

      const products = await SellerProducts.find({ sellerId : seller.sellerId });
  
      const { status, price_margine, ...otherDetails } = seller._doc;
      res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ sellerdetails: { ...otherDetails }, productDetails : products });
    } catch (err) {
        console.log(err);
    }
  });
 
 */
  router.route('/login').post(async (req, res) => {
    try {
      // Find the user based on the username (assuming unique usernames across different user types)
      const customer = await Customer.findOne({ email: req.body.username });
      const manager = await Manager.findOne({ email: req.body.username });
      const staff = await Staff.findOne({ username: req.body.username });
      //const staff = await Staff.findOne({ username: req.body.username });
      const specialist = await Specialist.findOne({ email: req.body.username });
      const seller = await Seller.findOne({ sellerId: req.body.username });

      // Determine the user type
      let userType = null;
      let userDetails = null;
      if (customer) {
        userType = 'customer';
        userDetails = customer;
      } 

      else if (specialist) {
        userType = 'specialist';
        userDetails = specialist;
      } 
      
      else if (manager) {
        userType = 'manager';
        userDetails = manager;
      } 

      else if (staff) {
        userType = 'staff';
        userDetails = staff;
      }
      
      else if (seller) {
        userType = 'seller';
        userDetails = seller;
      }

      if (!userType) {
        return res.status(401).json({ message: 'No user found' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Wrong password' }); 
      }

      let token ;
      if(userType === "seller") {

        token = jwt.sign(
          { sellerId: seller.sellerId, userType: userType },
          process.env.JWT
        );

      }else if(userType === "specialist"){
        token = jwt.sign(
          { specialistId: specialist._id, userType: userType },
          process.env.JWT
        );
      }else {

        token = jwt.sign(
          { userId: userDetails._id, userType: userType },
          process.env.JWT
        );
      
      };

      
      // Redirect logic based on user type
      let redirectURL = '/';
      switch(userType) {
        case 'customer':
          redirectURL = '/';
          break;
        case 'manager':
          redirectURL = '/manager/Inventory_Dashboard';
          break;
        case 'staff':
          redirectURL = '/staff';
          break;
        case 'seller':
          redirectURL = '/sellerMainHome/sellerHome';
          break;
        case 'specialist':
          redirectURL = '/specialistInterface/dashboard';
          break;
      }
  
  
      res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({ redirect: redirectURL,  user:userDetails });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;