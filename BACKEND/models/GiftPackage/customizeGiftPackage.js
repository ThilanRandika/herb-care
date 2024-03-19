const mongoose = require('mongoose');

const customGiftPackSchema = new mongoose.Schema(
    {
        //id of the ordered user
        customerId: {
            type: mongoose.Types.ObjectId,
            ref: "customer",
        },


        //name for the package
        packageName: {
            type : String,
            required: true
        },

        //products selected by customer
        products: [
            {
              product: { type: mongoose.Types.ObjectId, ref: "Product" },
              Name: String,
              pricePerItem: Number,
            },
        ],

        //total price of the package
        totalPrice: {
            type: Number,
            default: 0
        }    
    },
    { timestamps: true }
);

// Calculate the total price before saving the document
customGiftPackSchema.pre('save', function(next) {
    let totalPrice = 0;

    // Loop through the products array and sum up the prices
    this.products.forEach(product => {
        totalPrice += product.pricePerItem;
    });

    // Assign the total price to the totalPrice field
    this.totalPrice = totalPrice;

    next();
});

const customGiftPack = mongoose.model("customizeGiftPackage",customGiftPackSchema)

module.exports = customGiftPack;