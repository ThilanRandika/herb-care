const express = require('express');
const router = express.Router();
const Complaints = require('../../models/Feedback&Complaints/complaints');
const { verifyToOther } = require("../../utils/veryfyToken");
const Product = require('../../models/inventory/Product');
const PDFDocument = require('pdfkit');


// http://localhost:8070/complaints/add/productId
router.route('/add/:productId').post(verifyToOther, async (req, res) => {
    try {

        const complaints = new Complaints({
            Customer: req.person.userId,
            Order: req.body.orderId,
            Product: req.params.productId,
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
// PUT http://localhost:8070/complaints/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the complaint by ID and update its status
    const updatedComplaint = await Complaints.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated complaint
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//Read - Display user dashboard
// http://localhost:8070/complaints/get
router.route("/get").get(verifyToOther, async (req, res) => {
  try {

    const complaints = await Complaints.find({ Customer: req.person.userId });
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Read - Display staff & manager dashboard
// http://localhost:8070/complaints/get
router.route('/').get(async (req, res) => {
  try {
    const complaints = await Complaints.find().populate('Product');
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get total count of all complaints
// GET http://localhost:8070/complaints/count
router.get('/count', async (req, res) => {
  try {
    const count = await Complaints.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// fetch complaints with optional filtering
router.get('/complaints', async (req, res) => {
  try {
    let filter = {}; // Default empty filter

    // Check if a filter parameter is provided in the query
    if (req.query.filter) {
      // Assuming 'filter' is a query parameter specifying the status
      filter = { status: req.query.filter }; // Filter by status
    }

    // Fetch complaints based on the filter
    const complaints = await Complaint.find(filter);
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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


// Route to generate and download all Complaints as PDF
router.get('/download', async (req, res) => {
  try {
    const complaints = await Complaints.find();

    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename="complaints.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    pdfDoc.pipe(res);

    pdfDoc.fontSize(12).text('Complaints Report', { align: 'center' }).moveDown();

    complaints.forEach((complaint, index) => {
      pdfDoc.fontSize(10).text(`Complaint ${index + 1}:`);
      pdfDoc.fontSize(8).text(`Complaint Name: ${complaint.complaintsName}`);
      pdfDoc.fontSize(8).text(`Email: ${complaint.email}`);
      pdfDoc.fontSize(8).text(`Description: ${complaint.description}`);
      pdfDoc.fontSize(8).text(`Status: ${complaint.status}`);
      pdfDoc.fontSize(8).text(`Date: ${new Date(complaint.createdAt).toLocaleString()}\n\n`);
    });

    pdfDoc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});




module.exports = router;
