const SellerBag = require("../../models/sellerPartnership/SellerBag.js");
const { verifySellerToOther } = require("../../utils/veryfyToken.js");
const router = require("express").Router();

//Add product to the bag
router.route('/addToBag/:productId').post(verifySellerToOther, async (req,res) => {
    try{
        const sellerId = req.person.sellerId;
        const productId = req.params.productId;

        //req.body -- include quantity, price, total price
        const newBagItem = new SellerBag({sellerId: sellerId, product_id:productId, ...req.body});

        const savedBagItem = await newBagItem.save();

        res.status(200).json(savedBagItem);
    } catch(err){
        console.log(err);

    }
});

//View all bag Items for logged seller
router.route('/allBag').get(verifySellerToOther, async (req, res) => {
    try{
        const sellerId = req.person.sellerId;

        const bagItems = await SellerBag.find({sellerId: sellerId});

        res.status(200).json(bagItems);
    }catch(err){
        console.log(err);
    }
});

//Delete Bag Item
router.route('/deleteItem/:bagId').delete(async(req, res) => {
    try{
        const bagId = req.params.bagId;

        await SellerBag.findByIdAndDelete(bagId)

        res.status(200).json("Deleted the Item");
    }catch(err){
        console.log(err);
    }
});






module.exports = router;