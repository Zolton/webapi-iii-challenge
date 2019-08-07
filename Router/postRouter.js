const router = require("express").Router();

let posts = require("../posts/postDb");
let users = require("../users/userDb");

router.get("/", (req, res) => {
  posts.get().then(posts => {
    res.status(200).json(posts);
  });
});

router.get("/:id", (req, res) => {
  id = req.params.id;
  users
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

router.post("/", (req, res) => {
  newPost = req.body;
  posts.insert(newPost)
  .then(post => {
    res.status(200).json(newPost);
  })
  .catch(error => {
    res.status(500).json("There was a 500 status error");
  });
});

module.exports = router;
