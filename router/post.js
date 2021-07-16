const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/post");
const Report = require("../models/Report");
const multer = require("multer");

//upload multiple image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

//add new post with multiple image
router.post(
  "/newPosts",
  [authMiddleware, upload.array("gallery", 10)],
  (req, res) => {
    if (req.files) {
      let filesList = req.files.map(
        (file) =>
          (path = `${req.protocol}://${req.hostname}:4000/uploads/${file.filename}`)
      );
      let myBody = JSON.parse(req.body.info);
      let newPost = new Post({
        ...myBody,
        owner: req.userId,
        gallery: filesList,
      });
      newPost
        .save()
        .then((post) => res.status(200).send(post))
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    } else {
      let myBody = JSON.parse(req.body.info);
      let newPost = new Post({
        ...myBody,
        owner: req.userId
      });
      newPost
        .save()
        .then((post) => res.status(200).send(post))
        .catch((err) => {
          console.error(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    }
  }
);

//upload image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

//add new post with image
router.post(
  "/newPost",
  [authMiddleware, upload.single("avatar")],
  (req, res) => {
    let path =
      req.protocol +
      "://" +
      req.hostname +
      ":" +
      4000 +
      "/uploads/" +
      req.file.filename;
    let myBody = JSON.parse(req.body.info);
    console.log(req.body.info);
    let newPost = new Post({ ...myBody, owner: req.userId, avatar: path });
    newPost
      .save()
      .then((post) => res.status(200).send(post))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  }
);

//add new post
router.post("/new_post", authMiddleware, (req, res) => {
  let newPost = new Post({ ...req.body, owner: req.userId });
  newPost
    .save()
    .then((post) => res.status(200).send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get user post
router.get("/mine", authMiddleware, (req, res) => {
  Post.find({ "comments.owner": req.userId })
    .then((post) => res.send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get all posts
router.get("/allposts", (req, res) => {
  Post.find()
    .then((post) => res.send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get all posts
router.get("/allpost/:id", (req, res) => {
  Post.find()
    .then((post) => res.send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get post by id
router.get("/:id", (req, res) => {
  Post.findById({ _id: req.params.id })
    .then((post) => res.send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//delete post by id
router.delete("/:id", authMiddleware, (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id, owner: req.userId })
    .then(() => res.send("post deleted successfuly"))
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


//add report
router.post("/report/new_report/:id", authMiddleware, (req, res) => {
  let newReport = new Report({
    ...req.body,
    owner: req.userId,
    target: req.params.id,
  });
  newReport
    .save()
    .then((report) => res.status(200).send(report))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get all report
router.get("/report/all_reports", authMiddleware, (req, res) => {
  Report.find()
    .then((report) => res.send(report))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//get report BY ID
router.get("/report/:id", authMiddleware, (req, res) => {
  Report.find({ _id: req.params.id })
    .then((report) => res.send(report))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//delete report by id
router.delete("/report/delete/:id", authMiddleware, (req, res) => {
  Report.findByIdAndRemove({ _id: req.params.id })
    .then(() => res.send({ msg: "Report deleted successfuly" }))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//search by title
router.get("/search", (req, res) => {
  Post.find({ $and: [{ title: { $regex: req.query.title, $options: "i" } }] })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});


module.exports = router;
