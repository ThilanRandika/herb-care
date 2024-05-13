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
        products: {
              type: String, 
              required: true
            },
        

        //total price of the package
        totalPrice: {
            type: String,
            default: 0
        },
        
        
        //package image
        images: {
            type: [String],
            required: true
        }
    },

    { timestamps: true }
);


const DefaultGiftPack = mongoose.model("defaultGiftPackage",defaultGiftPackSchema)

module.exports = DefaultGiftPack;