const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/post");
const Comment = require("../models/Comment");
const mongoose = require('mongoose') 
const { v4: uuidv4 } = require('uuid');
// {type : mongoose.Types.ObjectId,ref : "User"}

//add comment 
router.put('/add/:id', authMiddleware, (req,res)=> {
    Post.findByIdAndUpdate({_id:req.params.id},{$push:{comments:{_id:uuidv4(),owner:req.userId,...req.body,updatedAt: new Date() }}})
        .then(() => res.json({ msg: "Comment was added" }))
        .catch((err) => {
          console.error(err.message);
          res.status(500).json({ msg: "Server Error" });
        });
  })

//Delete comment 
router.put('/delete/:id', authMiddleware, (req,res)=> {
    Post.findByIdAndUpdate({_id:req.params.id},{$pull:{comments:{_id:req.body._id}}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Comment was deleted'})
})
})

//Update comment   
router.put('/update/:id',authMiddleware, (req,res)=> {
    Post.findByIdAndUpdate({_id:req.params.id},{$set:{"comments.$[el].body": req.body.body}},{ 
    arrayFilters: [{ "el._id": req.body._id }],
    new: true
  },(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Comment was updated'})
})
})


module.exports = router