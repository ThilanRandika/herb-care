const express = require('express');
const router = express.Router();
const Complaints = require('../../models/Feedback&Complaints/complaints');
const { verifyToOther } = require("../../utils/veryfyToken");


// http://localhost:8070/complaints/add/productId
router.route('/add/:productId').post(verifyToOther, async (req, res) => {
    try {

        const complaints = new Complaints({
            Customer: req.person.userId,
            Order: req.body.Order,
            Product: req.params.productId,
            //giftPackageOrder: req.params.giftPackageOrder,
            complaintsName: req.body.complaintsName,
            email: req.body.email,
            description: req.body.description

        });

        await complaints.save();
        res.status(201).json({ message: 'Complaints submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// router.post('/add/:orderId', async (req, res) => {
//     try {
//         const orderId = req.params.orderId;
//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         const newComplaint = new Complaints({
//             userId: order.userId,
//             orderId: orderId,
//             productId: order.productId,
//             giftPackageId: order.giftPackageId,
//             complaintsName: req.body.complaintsName,
//             email: req.body.email,
//             description: req.body.description
//         });

//         const savedComplaint = await newComplaint.save();
//         res.status(201).json(savedComplaint);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


// Update the status of a complaint by ID
// PUT http://localhost:8070/complaints/update/:id
router.put('/update/:id', verifyToOther, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComplaint = await Complaints.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint status updated successfully', complaint: updatedComplaint });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//Read - Display user dashboard
// http://localhost:8070/complaints/get/:id
router.route("/get").get(verifyToOther, async (req, res) => {
  try {

    const complaints = await Complaints.find({ Customer: req.person.userId });
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


//Read - Display staff & manager dashbord
// http://localhost:8070/complaints/get
router.route('/get').get(async (req, res) => {
    try {
      const complaints = await Complaints.find();//.populate('userId orderId productId customizeGiftId defaultGiftId');
      res.status(200).json({ complaints });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });



//Delete - delete complaints
// http://localhost:8070/complaints/delete/:id
router.route('/delete/:id').delete(async (req, res) => {
  try {
    const complaintsId = req.params.id;

    await Complaints.findByIdAndDelete(complaintsId);

    res.status(200).json({ message: 'Complaints deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
