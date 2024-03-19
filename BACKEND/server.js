const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express(); 
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json()); 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, 
    //useFindAndModify: false
});

const customizeGiftPackageRouter = require("./routes/GiftPackage/customizeGiftPackage.js");
const defaultGiftpackageRouter = require("./routes/GiftPackage/defaultGiftpackage.js");
const giftPackageOrderRouter = require("./routes/GiftPackage/giftPackageOrder.js");

app.use("/customizeGiftPackage",customizeGiftPackageRouter);
app.use("/defaultGiftpackage",defaultGiftpackageRouter);
app.use("/giftPackageOrder",giftPackageOrderRouter);


const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})



app.listen(PORT,() =>{

    console.log(`Server is up and running on port number: ${PORT}`);
})
