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

        /*
        //products in the package
        products: [
            {
              product: { type: mongoose.Types.ObjectId, ref: "Product" },
              quantity: Number,
              pricePerItem: Number,
            },
        ],
        */

        //total price of the package
        totalPrice: {
            type: Number,
            required: true
        }    
    },
    { timestamps: true }
);


const DefaultGiftPack = mongoose.model("defaultGiftPackage",defaultGiftPackSchema)

module.exports = DefaultGiftPack;