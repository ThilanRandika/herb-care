const router = require("express").Router();
const Product = require("../models/product");



// Route to add a product
router.post('/add', async (req, res) => {
    try {
        // Extract product data from request body
        const { name, category,description,price,Manufactured_price,discount,quantity,image_url,expireDate,manufactureDate,ingredients} = req.body;

        // Create a new product instance
        const newProduct = new Product({
            name, category,description,price,Manufactured_price,discount,quantity,image_url,expireDate,manufactureDate,ingredients
        });

        // Save the new product to the database
        await newProduct.save();

        // Respond with success message
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get all products
router.route("/").get(async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Get a product
router.route("/get/:id").get(async (req, res) => {
    const productId = req.params.id;
    await Product.findById(productId)
        .then(product => res.status(200).send({ status: "Product fetched", product }))
        .catch(err => {
            console.error(err.message);
            res.status(500).send({ status: "Error with get product", error: err.message });
        });
});



//Update a product
router.route("/update/:id").put(async (req, res) => {
    try {
        const productId = req.params.id;
        const {  name, category,description,price,Manufactured_price,discount,quantity,image_url,expireDate,manufactureDate,ingredients } = req.body;

        const updateProduct = {
            name, category,description,price,Manufactured_price,discount,quantity,image_url,expireDate,manufactureDate,ingredients
        };

        await Product.findByIdAndUpdate(productId, updateProduct);
        res.status(200).send({ status: "Product updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

//Remove product 
router.route("/delete/:id").delete(async (req, res) => {

    const productId = req.params.id;

    await Product.findByIdAndDelete(productId)
        .then(() => res.status(200).send({ status: "Product deleted" }))
        .catch(err => {
            console.error(err.message);
            res.status(500).send({ status: "Error with delete product" });
        });
});

module.exports = router;