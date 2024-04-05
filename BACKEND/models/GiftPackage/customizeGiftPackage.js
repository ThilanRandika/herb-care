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
              type: mongoose.Types.ObjectId, 
              ref: "Product" ,
              required: true
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

// Method to calculate total price
customGiftPackSchema.methods.calculateTotalPrice = async function() {
    let totalPrice = 0;

    // Loop through the products array and sum up the prices
    for (const productId of this.products) {
        const product = await mongoose.model('Product').findById(productId);
        if (product) {
            totalPrice += product.price;
        }
    }

    // Update the total price field
    this.totalPrice = totalPrice;
};

// Calculate the total price before saving the document
customGiftPackSchema.pre('save', async function(next) {
    try {
        await this.calculateTotalPrice();
        next();
    } catch (error) {
        next(error);
    }
});

const customGiftPack = mongoose.model("customizeGiftPackage",customGiftPackSchema)

module.exports = customGiftPack;