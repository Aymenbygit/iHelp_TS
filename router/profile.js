const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;
const authMiddleware = require("../helpers/authMiddleware");
const multer = require('multer')

//upload image 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

// PUT : EDIT A USER BY ID
router.put( "/:id",[authMiddleware, upload.single('avatar')] ,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.file) {
      let path = req.protocol + "://" + req.hostname + ":" + 4000 + "/uploads/" + req.file.filename ;
      let myBody = JSON.parse(req.body.info)
    User.findByIdAndUpdate({_id:req.params.id},{...myBody, avatar: path},(err,msg)=> {
        err ? console.log(err) : res.json({msg:'user was updated'})
    })}
    else {
      let myBody = JSON.parse(req.body.info)
      User.findByIdAndUpdate({_id:req.params.id},{$set:{...myBody}},(err,msg)=> {
      err ? console.log(err) : res.json({msg:'user was updated'})
   
  })}
  }
);

//delete user by id
router.delete("/:id", authMiddleware, (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id })
  .then(() => res.send("user deleted successfuly"))
  .catch((err) => {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  });
});

//edit post by id
router.put("/update/:id", [authMiddleware, upload.array("gallery", 10)], (req, res) => {

  if (req.files) {
    let filesList = req.files.map(
      (file) =>
        (path = `${req.protocol}://${req.hostname}:4000/uploads/${file.filename}`)
    );
    let myBody = JSON.parse(req.body.info);
    Post.findByIdAndUpdate({ _id: req.params.id }, {
      ...myBody,
      owner: req.userId,
      gallery: filesList,
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  } else {
    let myBody = JSON.parse(req.body.info);
    Post.findByIdAndUpdate({ _id: req.params.id }, { ...myBody })
      .then((data) => res.json(data))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  }
});

//   Post.findByIdAndUpdate({ _id: req.params.id }, { ...req.body })
//   .then((data) => res.json(data))
//   .catch((err) => {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server Error" });
//   });
// });

//add favorite to Array 
router.put('/addfavorites/:id', authMiddleware, (req,res)=> {
User.findByIdAndUpdate({_id:req.params.id},{$push:{favorites:{...req.body}}},(err,msg)=> {
  err ? console.log(err) : res.json({msg:'Post was added to favorites'})
})
})

//remove ALL favorite from Array 
router.put('/removefavoritesAll/:id', authMiddleware,(req,res)=> {
  User.findByIdAndUpdate({_id:req.params.id},{$pull:{favorites:{...req.body}}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Post was removed from favorites'})
})
})

//remove favorite from Array 
router.put('/removefavorites/:id', (req,res)=> {
  User.findByIdAndUpdate({_id:req.params.id},{$pull:{favorites:{_id:req.body._id}}},(err,msg)=> {
    err ? console.log(err) : res.json({msg:'Post was removed from favorites'})
})
})


module.exports = router;
