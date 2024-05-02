const ProductModel = require('../models/inventory/Product');

const test = (req, res) => {
    res.json('test is working')
}
const EveryProduct = (req, res) => {
    ProductModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

const getOneProduct = (req, res) => {
    const id =req.params.id;
    ProductModel.findById({_id:id})
    .then(productdata=>res.json(productdata))
    .catch(err=>res.json(err));

}

module.exports = {
    test,
    EveryProduct,
    getOneProduct
    
}