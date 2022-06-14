const mongoose=require("mongoose");
const Schema=mongoose.mongoose.Schema;

const voteSchema=new Schema({
    stack:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    }
})

//create collection and add schema
const Vote=mongoose.model("Vote",voteSchema);

module.exports=Vote;