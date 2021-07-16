const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//login user
router.post(
  "/",
  [
    body("email", "Please enter a valid Email").isEmail(),
    body("password", "Please enter your password").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "Please regiter before" }] });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res.status(404).json({ errors: [{ msg: "Wrong password!" }] });
        } else {
          let payload = {
            userId: user._id,
          };
          jwt.sign(payload, secret_key, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);
//get all users
router.get("/allusers", (req, res) => {
  User.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
//get user by id
router.get("/user/:id", (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
//load connected user
router.get("/", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .select("-__v")
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;
