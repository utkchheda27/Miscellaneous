const mongoose=require("mongoose");
const dotenv= require("dotenv")
dotenv.config();

const dbUrl=process.env.DB_URL;

//Map global promise
mongoose.Promise=global.Promise;

//connecting to mongodbatlas
mongoose.connect(dbUrl)
.then(()=>console.log("DB connected"));
