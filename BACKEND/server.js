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

const sellerRouter = require( "./routes/sellerPartnership/seller.js" );
const sellerPartnershipRequestRouter = require( "./routes/sellerPartnership/sellerPartnershipRequest.js" );
const sellerProducts = require( "./routes/sellerPartnership/sellerProducts.js" )
const authRouter = require( "./routes/auth.js" );


const cookieParser = require("cookie-parser");

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Use this option
    // useFindAndModify: false
});

app.use(cookieParser());



app.use("/seller", sellerRouter);
app.use("/sellerPartnershipRequest", sellerPartnershipRequestRouter);
app.use("/sellerProducts",  sellerProducts);
app.use("/auth", authRouter);

const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})

app.listen(PORT,() =>{

    console.log(`Server is up and running on port number : ${PORT}`);
})
