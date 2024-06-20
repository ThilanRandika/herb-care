const SellerAppointment = require("../../models/sellerPartnership/SellerAppointment");
const { verifySellerToOther } = require("../../utils/veryfyToken");

const router = require("express").Router();


router.route('/creatAppoinment/:sellerId').post( async(req, res) => {
    try{
        const { topic, discription } = req.body;
        const sellerId = req.params.sellerId;

        const newAppointment = new SellerAppointment({
            sellerId,
            topic,
            discription,
        });

        const savedAppointment = await newAppointment.save();

        res.status(200).json(savedAppointment);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;