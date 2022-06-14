const express=require("express");
const router=express.Router();//set up the router 
const Pusher = require("pusher");
const mongoose=require("mongoose");
const dotenv= require("dotenv");
const {appId,key,secret}=process.env;

const Vote=require("../models/vote")

const pusher = new Pusher({
  appId: "1422822",
  key: "0019b32075c7c166e5de",
  secret: "dd74bfa5b00d114b676c",
  cluster: "ap2",
  useTLS: true
});

//setting router
router.get("/",(req,res)=>{
    Vote.find().then(votes=>res.json({success:true,votes:votes}))//array of votes inside votes
});

//to handle post requst made using the form
router.post("/",(req,res)=>{

    //first save formsubmit data to db
    const newVote={
      stack:req.body.stack,
      points:1
    }

    new Vote(newVote).save().then(vote =>{
      //this triggers pusher
    pusher.trigger("poll", "vote", {
      points:parseInt(vote.points),
      stack:vote.stack
    });
    return res.json({success:true,message:"Thank you for voting... "})
    })

    
})
module.exports=router;