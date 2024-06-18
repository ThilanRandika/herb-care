const Seller = require("../../models/sellerPartnership/Seller.js");
const SellerProducts = require("../../models/sellerPartnership/SellerProducts.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const emailSender = require('../../emailSender.js');
const PartnershipRequest = require("../../models/sellerPartnership/SellerPartnershipRequest.js");
const Product = require("../../models/inventory/Product.js");

const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const multer = require("multer");
const path = require('path');

// Define storage for the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/fileUploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Initialize multer instance with the storage options
const upload = multer({ storage: storage });

//CREATE - Add new seller seller
router.route("/addSeller").post(upload.single("seller_agreement"), async (req, res) => {
  try {
    //save seller details to seller collection

    console.log(req.file.filename);

    const sellerDetails = JSON.parse(req.body.seller);
    const productDetails = JSON.parse(req.body.products);

    // Extract required fields from sellerDetails
    const { email, seller_name, company, company_discription, address, contact_num, website, tax_id, status, price_margine } = sellerDetails;

    // Create new Seller object
    const newSeller = new Seller({
      email,
      seller_name,
      company,
      company_discription,
      address,
      contact_num,
      website,
      tax_id,
      status,
      price_margine,
      seller_agreement: req.file.filename, // Assuming this is the correct field to store the seller agreement
    });
    const savedSeller = await newSeller.save();

    const password = savedSeller.toJSON().password;

    // Hash the password after saving the seller data
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(savedSeller.password, salt);

    // Update the seller document with the hashed password
    savedSeller.password = hash;
    await savedSeller.save();

    //save related product details to sellerproduct collection
    const sellerProducts = productDetails.map((productData) => ({
      ...productData,
      sellerId: savedSeller.sellerId,
    }));
    const savedSellerProducts = await SellerProducts.insertMany(sellerProducts);

    // Remove from partnership request table
    const requestId = req.body.seller._id;
    try{
      await PartnershipRequest.findByIdAndDelete({_id: requestId});
    }catch(err){
      console.log(err)
    }
    

    async function sendCustomEmail() {
      const receiver = savedSeller.toJSON().email;
      const html =  `
      <PASSWORD> USERNAME - ${savedSeller.toJSON().sellerId}, PASSWORD - ${password},</b> 
      <p>This is your username and password please use them to log in to our web application and you can change your password your own</p>`;
      const subject = "To inform registration - HerbCare";
    
      try {
        await emailSender.sendEmail(receiver, html, subject );
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
    
    sendCustomEmail();

    res
      .status(200)
      .json({
        sellerId: savedSeller.toJSON().sellerId,
        sellerPassword: savedSeller.toJSON().password,
        savedProducts: savedSellerProducts,
      });
  } catch (err) {
    console.log(err);
  }
});

//READ - view all sellers
router.route("/all").get(async (req, res) => {
  try {
    //get seler details
    const sellers = await Seller.find();
    //get prouct details related to seller
    const sellersWithProducts = await Promise.all(
      sellers.map(async (seller) => {
        const products = await SellerProducts.find({
          sellerId: seller.sellerId,
        });
        return {
          ...seller._doc,
          products,
        };
      })
    );

    if (req.query.format && req.query.format === 'pdf') {
      const doc = new PDFDocument({ margin: 30, size: 'A4' });

      // Pipe the PDF document directly to the response
      doc.pipe(res);

      // Set document title
      doc.fontSize(20).text('Registered Sellers Report', { align: 'center' }).moveDown();

      // Set up table headers
      const tableData = sellersWithProducts.map((seller) => [
        seller.seller_name,
        seller.email,
        seller.address,
        seller.contact_num,
        seller.company,
        seller.company_discription ? seller.company_discription : 'N/A',
        seller.website,
        seller.taxId ? seller.taxId : 'N/A'
      ]);
      
      // Set up the table object with headers and data
      const table = {
        headers: ['Seller Name', 'Email', 'Address', 'Contact Number', 'Company Name', 'Company Description', 'Company Website', 'Tax ID'],
        rows: tableData
      };
      console.log(table)

      // Set table options
      const tableOptions = {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
  prepareRow: (row, indexColumn, indexRow, rectRow) => {
  doc.font("Helvetica").fontSize(8);
  indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'blue' : 'green'), 0.15);
},
      };

      // Draw the table
      doc.table(table, tableOptions);

      // End the document
      doc.end();
    } else {
      res.status(200).json(sellersWithProducts);
    }
  } catch (err) {
    console.log(err);
  }
});

//READ - get one seller detail
router.route("/oneSeller/:sellerId").get( async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    //get seler details
    const seller = await Seller.findOne({ sellerId: sellerId });
    //get prouct details related to seller
    const Products = await SellerProducts.find({ sellerId: sellerId });


    const productIds = Products.map((product) => product.product_id);

    const mergedProducts = [];

    for (const productId of productIds) {
      const product = await Product.findById(productId);

      if (product) {
        const sellerProduct = await SellerProducts.findOne({
          product_id: productId,sellerId: sellerId,
        });

        mergedProducts.push({
          productDetail : product,
          Products: sellerProduct,
        });
      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    }

    //populate seller with product details
    //(const productss = await SellerProducts.find({sellerId: sellerId}).populate('productId',['name','price']);)

    const sellerWithProducts = { seller, mergedProducts };

    res.status(200).json(sellerWithProducts);
  } catch (err) {
    console.log(err);
  }
});

//READ - get one seller detail FOR Profile edit
router.route("/oneSeller/:sellerId").get( async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    //get seler details
    const seller = await Seller.findOne({ sellerId: sellerId });
    //get prouct details related to seller
    const Products = await SellerProducts.find({ sellerId: sellerId });

    

    //populate seller with product details
    //(const productss = await SellerProducts.find({sellerId: sellerId}).populate('productId',['name','price']);)

    const sellerWithProducts = { seller, Products };

    res.status(200).json(sellerWithProducts);
  } catch (err) {
    console.log(err);
  }
});

//UPDATE - update seller details
router.route("/updateSeller/:id").put(async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.seller.password, salt);

    // Update seller details
    const updatedSeller = await Seller.findOneAndUpdate(
      { sellerId: req.params.id },
      { $set: { ...req.body.seller, password: hash } }, // Assuming req.body.seller contains the updated seller details
      { new: true }
    );

    /*(const updatedProducts = await SellerProducts.updateMany(
            { sellerId: sellerId },
            { $set: req.body.products }, // Assuming req.body.products contains the updated product details
            { new: true }
        );  )*/

    // Update associated products
    const updatedProducts = await Promise.all(
      req.body.Products.map(async (updatedProduct) => {
        const productId = updatedProduct.product_id;

        const updatedProductDetails = await SellerProducts.findOneAndUpdate(
          { sellerId: req.params.id, product_id: productId },
          { $set: updatedProduct },
          { new: true }
        );
        return updatedProductDetails;
      })
    );

    res.status(200).json({ updatedSeller, updatedProducts });
  } catch (err) {
    console.log(err);
  }
});

//DELETE - delete seller
router.route("/deleteSeller/:id").delete(async (req, res) => {
  try {
    const sellerId = req.params.id;

    //delete seller
    await Seller.findOneAndDelete({ sellerId: sellerId });
    //delete products related to seller
    await SellerProducts.deleteMany({ sellerId: sellerId });

    res.status(200).json("Deleted the seller");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
