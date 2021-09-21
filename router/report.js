const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const Report = require("../models/Report");

//add report
router.post("/report/new_report", authMiddleware, (req, res) => {
  let newReport = new Report({
    ...req.body,
    owner: req.userId,
    target: req.params.id,
  });
  newReport
    .save()
    .then(() =>
      res.status(200).json({ msg: "your report has been sent successfully" })
    )
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get report
router.get("/report", authMiddleware, (req, res) => {
  Report.find({ owner: req.userId })
    .then((report) => res.send(report))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get all report
router.get("/all_reports", authMiddleware, (req, res) => {
  Report.find()
    .then((report) => res.send(report))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;
