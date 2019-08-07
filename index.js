// code away!

const express = require("express");
const server = express();
const postRouterFile = require("./Router/postRouter")

server.use(express.json());
server.use("/posts", postRouterFile)

server.get("/", (req, res) => {
  res.status(200).json({message: "Welcome to root index"});
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
