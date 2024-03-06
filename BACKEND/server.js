const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express(); 
require("dotenv").config();

const PORT = process.env.PORT || 8027;

app.use(cors());
app.use(bodyParser.json()); 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Use this option
    // useFindAndModify: false
});



const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})
//Inventory manager product addition
const productRouter = require("./routes/inventoryManagers.js");
app.use("/product", productRouter);



app.listen(PORT,() =>{

    console.log(`Server is up and running on port number : ${PORT}`);
})
