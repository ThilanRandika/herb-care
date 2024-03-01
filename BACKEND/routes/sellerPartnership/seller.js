const PartnershipRequest = require('../../models/SellerPartnershipRequest.js');
const Seller = require('../../models/Seller.js');
const SellerProducts = require('../../models/SellerProducts.js');
const router = require('express').Router();


//CREATE - partnership request
router.route('/add').post(async (req,res) => {
    const newPartnershipRequest = new PartnershipRequest(req.body);
    try{
        const savedPartnershipRequest = await newPartnershipRequest.save();
        res.status(200).json(savedPartnershipRequest);
    } catch(err){
        console.log(err);
    }
});

//READ - view in manager dashboard all request
router.route('/allSellerReqAll').get(async (req, res) => {
    try{
        const requests = await PartnershipRequest.find();
        res.status(200).json(requests);
    }catch(err){
        console.log(err);
    }
});

//READ - view in manager dashboard pending request
router.route('/allSellerReq').get(async (req, res) => {
    try{
        const pendingRequests = await PartnershipRequest.find({ status: 'request_pending' });
        res.status(200).json(pendingRequests);
    }catch(err){
        console.log(err);
    }
});

//READ - view one request by id
router.route('/oneReq/:id').get(async (req, res) => {
    try{
        const requestId = req.params.id;
        const request = await PartnershipRequest.findById(requestId);

        res.status(200).json(request);
    }catch(err){
        console.log(err);
    }
});

//READ - view in manager dashboard discussion level
router.route('/allSellerReqDis').get(async (req, res) => {
    try{
        const disRequests = await PartnershipRequest.find({ status: 'discussion_state' });
        res.status(200).json(disRequests);
    }catch(err){
        console.log(err);
    }
});

//UPDATE - approve partnership request to discussion
router.route('/reqAprove/:id').put(async (req, res) => {
    try{
        const requestId = req.params.id;
        const updatedRequest = await PartnershipRequest.findByIdAndUpdate(requestId,  
            {$set: {'status': 'discussion_state'}}, 
            {new: true} 
        );
        res.status(200).json(updatedRequest);
    }catch(err){
        console.log(err)
    }
});

//DELETE - reject partnership request
router.route('/rejectReq/:id').delete(async(req, res) => {
    const requestId = req.params.id;
    try{
        await PartnershipRequest.findByIdAndDelete(requestId)
        res.status(200).json("Deleted the request");
    }catch(err){
        console.log(err);
    }
});

//READ - get all details from PartnershipRequest to register form
router.route('/add/:id').post(async (req,res) => {
    const requestId = req.params.id;
    try{
        // get request table detals and delete it and save it to seller table
        const requestDetails = await PartnershipRequest.findById(requestId);
        await PartnershipRequest.findByIdAndDelete(requestId);
        res.status(200).json(requestDetails);
    } catch(err){
        console.log(err);
    }
});

//CREATE - Add new seller seller
router.route('/addSeller').post(async (req,res) => {
    try{
        //save seller details to seller collection
        const newSeller = new Seller(req.body.seller);
        const savedSeller = await newSeller.save();

        //save related product details to sellerproduct collection
        const sellerProducts = req.body.products.map(productData => ({
            ...productData,
            sellerId: savedSeller.sellerId,
        }));
        const savedSellerProducts = await SellerProducts.insertMany(sellerProducts);

        res.status(200).json({seller : savedSeller.toJSON().sellerId,  savedProducts : savedSellerProducts});
    } catch(err){
        console.log(err);
    }
});

//READ - view all sellers
router.route('/all').get(async (req, res) => {
    try{
        //get seler details
        const sellers = await Seller.find();
        //get prouct details related to seller
        const sellersWithProducts = await Promise.all(
            sellers.map(async (seller) => {
                const products = await SellerProducts.find({ sellerId: seller.sellerId });
                return {
                    ...seller._doc,
                    products,
                };
            })
        );
        res.status(200).json(sellersWithProducts);
    }catch(err){
        console.log(err);
    }
});

//READ - get one seller detail
router.route('/oneSeller/:sellerId').get(async (req, res) => {
    try{
        const sellerId = req.params.sellerId;
        //get seler details
        const seller = await Seller.findOne( { sellerId: sellerId} ) ;
        //get prouct details related to seller
        const Products = await SellerProducts.find( { sellerId: sellerId } );   
        
        //populate seller with product details
        //(const productss = await SellerProducts.find({sellerId: sellerId}).populate('productId',['name','price']);)

        const sellerWithProducts = {...seller._doc ,Products};  

        res.status(200).json(sellerWithProducts);
    }catch(err){
        console.log(err);
    }
});

//UPDATE - update seller details
router.route('/updateSeller/:id').put(async (req, res) => {
    try{
        const sellerId = req.params.id;

         // Update seller details
         const updatedSeller = await Seller.findOneAndUpdate(
            { sellerId : sellerId },
            { $set: req.body.seller }, // Assuming req.body.seller contains the updated seller details
            { new: true }
        );

        /*(const updatedProducts = await SellerProducts.updateMany(
            { sellerId: sellerId },
            { $set: req.body.products }, // Assuming req.body.products contains the updated product details
            { new: true }
        );  )*/
            
         // Update associated products
        const updatedProducts = await Promise.all(
            req.body.products.map(async (updatedProduct) => {
                const productId = updatedProduct.product_id;
        
                const updatedProductDetails = await SellerProducts.findOneAndUpdate(
                    { sellerId: sellerId, product_id: productId },
                    { $set: updatedProduct },
                    { new: true }
                );
                return updatedProductDetails;
            })
        );
        
        res.status(200).json({updatedSeller, updatedProducts});
    }catch(err){
        console.log(err)
    }
});

//DELETE - delete seller
router.route('/deleteSeller/:id').delete(async(req, res) => {
    try{
        const sellerId = req.params.id;

        //delete seller
        await Seller.findOneAndDelete( {sellerId : sellerId} )
        //delete products related to seller
        await SellerProducts.deleteMany( { sellerId : sellerId } );

        res.status(200).json("Deleted the seller");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
