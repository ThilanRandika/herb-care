const PartnershipRequest = require('../../models/sellerPartnership/SellerPartnershipRequest.js');
const Seller = require('../../models/sellerPartnership/Seller.js');
const SellerProducts = require('../../models/sellerPartnership/SellerProducts.js');
const router = require('express').Router();
const emailSender = require('../../emailSender');

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
        const requestSeller =  await PartnershipRequest.findById(requestId);

        async function sendCustomEmail() {
            const receiver = requestSeller.toJSON().email;
            const html =  `
            <b>Congratulations ${requestSeller.toJSON().seller_name}</b> 
            <p>We are happy to be a partner with your company. <p>this is ouer contact details: Contact Number -  071256389, Email - herncare@gmail.com</p> <p>We contact you to discuss the futher details.</p><p>Thank You!</p>`;
            const subject = "To inform approvel of Partnership Request - HerbCare";
          
            try {
              await emailSender.sendEmail(receiver, html, subject );
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }
          sendCustomEmail();

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
router.route('/add/:id').get(async (req,res) => {
    const requestId = req.params.id;
    try{
        // get request table detals and delete it and save it to seller table
        const requestDetails = await PartnershipRequest.findById(requestId);
        //await PartnershipRequest.findByIdAndDelete(requestId);
        res.status(200).json(requestDetails);
    } catch(err){
        console.log(err);
    }
});


module.exports = router;