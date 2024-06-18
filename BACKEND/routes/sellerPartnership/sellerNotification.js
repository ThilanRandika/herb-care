const Seller = require("../../models/sellerPartnership/Seller");
const { verifySellerToOther } = require("../../utils/veryfyToken");

const router = require("express").Router();



router.route('/getNotifications/:sellerId').get( async(req, res) => {
    try{
        const sellerId = req.params.sellerId;
        const seller = await Seller.findOne({ sellerId: sellerId });

        res.status(200).json(seller);
    }catch(err){
        console.log(err);
    }
});

//get unread count
router.route("/unReadCount/:sellerId").get( async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const seller = await Seller.findOne({ sellerId });

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        const unreadCount = seller.unread_notification.length;

        // Send the unread notification count in the response
        res.status(200).json({ unreadCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.route('/markAsReadNotification/:sellerId').put( async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const seller = await Seller.findOne({ sellerId: sellerId });

        const unRead = seller.unread_notification;
        const read = seller.read_notification;

        // Move unread notifications to read notifications
        read.push(...unRead);

        // Update the document to move unread notifications to read and clear unread notifications
        await Seller.findOneAndUpdate(
            { sellerId: seller.sellerId },
            { 
                $push: { read_notification: { $each: unRead } }, // Add unread notifications to the read_notification array
                $set: { unread_notification: [] } // Clear the unread_notification array
            },
            { new: true }
        );

        res.status(200).json(seller.read_notification);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//Delete Bag Item
router.route('/deleteNotification/:sellerId').put( async(req, res) => {
    try{
        const sellerId = req.params.sellerId;
        const seller = await Seller.findOne({ sellerId: sellerId });

        await Seller.findOneAndUpdate(
            { sellerId: seller.sellerId },
            { 
                $set: { read_notification: [] } // Clear the unread_notification array
            },
            { new: true }
        );

        res.status(200).json("Deleted the Notifications");
    }catch(err){
        console.log(err);
    }
});





module.exports = router;