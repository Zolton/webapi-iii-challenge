const router = require("express").Router();

let posts = require("../posts/postDb");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to router" });
});

module.exports = router;
