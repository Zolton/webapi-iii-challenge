// code away!

const express = require("express");
const server = express();
const postRouterFile = require("./Router/postRouter");

server.use(express.json());
server.use("/posts", postRouterFile);

let users = require("./users/userDb");

function logger(req, res, next) {
  let request = req.body.method;
  let url = req.body.url;
  let timestamp = Date.now();
  next();
}

function validateUserId(req, res, next) {}

server.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.get("/:id", (req, res) => {
  const id = req.params.id;
  users
    .getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.post("/", (req, res) => {
  const newUser = req.body
  users
    .insert(newUser)
    .then(newU => {
      res.status(200).json(newU);
    })
    .catch(error => {
      res.status(500).json("There was a 500 status error");
    });
});

server.put("/:id", (req, res)=>{
    const id = req.params.id
    const change = req.body
    users.update(id, change)
    .then(updatedUser=>{
        res.status(200).json(updatedUser)
    })
    .catch(error => {
        res.status(500).json("There was a 500 status error");
      });
})

server.delete("/:id", (req, res)=>{
    const id = req.params.id
    users.remove(id)
        .then(deletedUser=>{
            res.status(200).json({message: "Deleted 1 user"})
        })
        .catch(error => {
            res.status(500).json("There was a 500 status error");
          });
})

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
