const SellerProducts = require("../../models/sellerPartnership/SellerProducts.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");

const router = require("express").Router();

//READ - view all products
router.route("/products").get(verifySellerToOther, async (req, res) => {
  try {
    //get products related to the seller
    const sellerId = req.person.sellerId;
    const sellerProducts = await SellerProducts.find({ sellerId: sellerId });

    //get all details about that products
    const productIds = sellerProducts.map((product) => product.product_id);
    const products = await Product.find({ _id: { $in: productIds } });

    //merge product details
    const mergedProducts = products.map((product) => {
      const sellerProduct = sellerProducts.find((sp) =>
        sp.product_Id.equals(product._id)
      );
      return {
        ...product._doc, // Include all details from Product
        mini_quantity: sellerProduct.mini_quantity,
        price_margine: sellerProduct.price_margine,
      };
    });

    res.status(201).json(mergedProducts);
  } catch (err) {
    console.log(err);
  }
});

//READ - view details of one specific product
router
  .route("/products/:productId")
  .get(verifySellerToOther, async (req, res) => {
    try {
      //get product detail from seller product table
      const sellerId = req.person.sellerId;
      const productId = req.params.productId;

      const sellerProduct = await SellerProducts.findOne({
        sellerId: sellerId,
        product_id: productId,
      });

      //get product details from product table
      const product = await Product.findById(productId);

      //merge product details
      const mergedProduct = {
        ...product._doc,
        mini_quantity: sellerProduct.mini_quantity,
        price_margine: sellerProduct.price_margine,
      };

      res.status(201).json(mergedProduct);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
