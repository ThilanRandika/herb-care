const router = require('express').Router();
const bcrypt = require ('bcryptjs');
const Seller = require('../models/sellerPartnership/Seller');
const SellerProducts = require('../models/sellerPartnership/SellerProducts');
const jwt  = require("jsonwebtoken");


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

module.exports = router;