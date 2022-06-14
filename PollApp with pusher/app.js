const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv= require("dotenv")
dotenv.config();

const poll=require("./routes/poll");
const mongoose=require("mongoose");

const app=express();

//DB config
require("./config/db")

//set public folder
app.use(express.static(path.join(__dirname,"public")));

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//enable cors
app.use(cors()); //cors middleware 

app.use("/poll",poll);

//starting the server
const port=3000;
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})

