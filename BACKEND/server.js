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
    // useCreateIndex: true, // Use this option
    // useFindAndModify: false
});



const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Mongodb Connection Success!");

})

const feedbackRouter = require("./routes/Feedback&complaints/feedbacks.js");
//http://localhost:8070/feedback
app.use("/feedback",feedbackRouter);

const complaintsRouter = require("./routes/Feedback&complaints/complaintses.js");
//http://localhost:8070/complaints
app.use("/complaints",complaintsRouter);


app.listen(PORT,() =>{

    console.log(`Server is up and running on port number : ${PORT}`);
})
