const Product = require("../../models/inventory/Product.js");
const SellerProducts = require("../../models/sellerPartnership/SellerProducts.js");

const router = require("express").Router();

//READ - view all products
router.route("/products/:sellerId").get( async (req, res) => {
  try {
    console.log(req.params.sellerId);
    //get products related to the seller
    const sellerId = req.params.sellerId;
    const sellerProducts = await SellerProducts.find({ sellerId: sellerId });

    //get all details about that products
    const productIds = sellerProducts.map((product) => product.product_id);

    const uniqueCategories = await Product.distinct("category", {
      _id: { $in: productIds },
    });

    // Step 3: Filter products by category when requested
    let filter = {};
    if (req.query.category) {
      filter = { category: req.query.category };
    }

    const products = await Product.find({
      _id: { $in: productIds },
      ...filter,
    });

    const mergedProducts = [];

    for (const product of products) {

      console.log(product);

      if (product) {
        const sellerProduct = await SellerProducts.findOne({
          sellerId: sellerId,
          product_id: product._id,
        });
        console.log(product)
        const calculatedPrice =
          ((100 - sellerProduct.price_margine) * product.price) /
          100;

        mergedProducts.push({
          ...product._doc,
          mini_quantity: sellerProduct.mini_quantity,
          price_margine: sellerProduct.price_margine,
          calculatedPrice: calculatedPrice,
        });
      } else {
        console.log(`Product with ID ${product._id} not found.`);
      }
    }

    //merge product details
    /*{const mergedProducts = products.map((product) => {
      const sellerProduct = sellerProducts.find((sp) =>
        sp.product_id == product._id
      );
      return {
        ...product._doc, // Include all details from Product
        mini_quantity: sellerProduct.mini_quantity,
        price_margine: sellerProduct.price_margine,
      };
    });}*/

    res.status(201).json({products: mergedProducts, categories: uniqueCategories});
  } catch (err) {
    console.log(err);
  }
});

//READ - view details of one specific product
router
  .route("/products/:sellerId/:productId")
  .get(async (req, res) => {
    try {
      //get product detail from seller product table
      const sellerId = req.params.sellerId;
      const productId = req.params.productId;

      const sellerProduct = await SellerProducts.findOne({
        sellerId: sellerId,
        product_id: productId,
      });

      //get product details from product table
      const product = await Product.findById(productId);

      const calculatedPrice =
  ((100 - sellerProduct.price_margine) * product.price) /
  100;

      //merge product details
      const mergedProduct = {
        ...product._doc,
        mini_quantity: sellerProduct.mini_quantity,
        price_margine: sellerProduct.price_margine,
        calculatedPrice: calculatedPrice,
      };

      res.status(201).json(mergedProduct);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
