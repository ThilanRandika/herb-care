const mongoose = require('mongoose');

const defaultGiftPackSchema = new mongoose.Schema(
    {
        //name for the package
        packageName: {
            type : String,
            required: true
        },

        //description about the package
        description: {
            type : String,
            required: true
        },

        
        //products in the package
        products: [
            {
              type: mongoose.Types.ObjectId, 
              ref: "Product",
              required: true
            },
        ],
        

        //total price of the package
        totalPrice: {
            type: Number,
            default: 0
        },
        
        
        //package image
        images: {
            type: [String],
            required: false
        }
    },

    { timestamps: true }
);


// Method to calculate total price
defaultGiftPackSchema.methods.calculateTotalPrice = async function() {
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
defaultGiftPackSchema.pre('save', async function(next) {
    try {
        await this.calculateTotalPrice();
        next();
    } catch (error) {
        next(error);
    }
});


const DefaultGiftPack = mongoose.model("defaultGiftPackage",defaultGiftPackSchema)

module.exports = DefaultGiftPack;