const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../helpers/authMiddleware");


//new msg
router.post("/new_message", (req, res) => {
    let newMessage = new Message({ ...req.body });
    newMessage
      .save()
      .then(() => res.status(200).send('Your message has been sent successfully'))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  });

    //get all msgs
    router.get("/all_message", authMiddleware, (req, res) => {
      Message.find()
        .then((Message) => res.send(Message))
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    });
//delete msg by id
    router.delete("/:id", authMiddleware, (req, res) => {
      Message.findByIdAndRemove({ _id: req.params.id, owner: req.userId })
        .then(() => res.send("Message deleted successfuly"))
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    });
    
//mark as read msg by id
    router.put("/:id", authMiddleware, (req, res) => {
      Message.findByIdAndUpdate({ _id: req.params.id}, { ...req.body,read:true })
        .then((e) => res.json(e))
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    });


module.exports = router ;