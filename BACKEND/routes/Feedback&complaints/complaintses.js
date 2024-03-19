const express = require('express');
const router = express.Router();
const Complaints = require('../../models/Feedback&Complaints/complaints');
//const Order = require('../models/order');

// http://localhost:8070/feedback/add
router.post('/add/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const newComplaint = new Complaints({
            userId: order.userId,
            orderId: orderId,
            productId: order.productId,
            giftPackageId: order.giftPackageId,
            complaintsName: req.body.complaintsName,
            email: req.body.email,
            description: req.body.description
        });

        const savedComplaint = await newComplaint.save();
        res.status(201).json(savedComplaint);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
