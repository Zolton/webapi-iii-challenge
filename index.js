// code away!

const express = require("express");
const server = express();
const postRouterFile = require("./Router/postRouter");

server.use(express.json());
server.use("/posts", postRouterFile);

let users = require("./users/userDb");

function logger(req, res, next) {
  console.log("Request method :", req.method);
  console.log("Request URL: ", req.url);
  console.log("Timestamp: ", Date.now());
  next();
}

function validateUserId(req, res, next) {
    const id = req.params.id;
    users
    .getById(id)
    .then(user => {
      if (user) {
        let userObject = req.user
        next();
      } 
      else {
        res.status(400).json("Invalid user ID");
      }
    })
}

function validateUser (req, res, next) {
    if (!req.body) {
        res.status(400).json("Missing User Data")
    }
    if(!req.body.name) {
        res.status(400).json("Missing required field name")
    }
    else {
        next()
    }
}

server.get("/", logger, (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.get("/:id", logger, validateUserId, (req, res, next) => {
    const id = req.params.id;
    users
    .getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } 
      else {
        res.status(400).json("Invalid user ID");
      }
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.post("/", logger, validateUser, (req, res) => {
  const newUser = req.body;
  users
    .insert(newUser)
    .then(newU => {
      res.status(200).json(newU);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.put("/:id", logger, (req, res) => {
  const id = req.params.id;
  const change = req.body;
  users
    .update(id, change)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.delete("/:id", logger, (req, res) => {
  const id = req.params.id;
  users
    .remove(id)
    .then(deletedUser => {
      res.status(200).json({ message: "Deleted 1 user" });
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = server;