const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const poll=require("./routes/poll");
const app=express();
const mongoose=require("mongoose");

//DB config
require("./config/db")
const dotenv= require("dotenv")
dotenv.config();

const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl)
.then(() => {
    console.log("Connected to database succcessfully");
})
.catch((err) => {
    console.log(err);
})

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

