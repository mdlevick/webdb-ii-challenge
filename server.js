const express = require("express");

const CarRouter = require("./cars/router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2>Tuesday, December 10th Project.</h2>");
});

server.use("/api/cars", CarRouter);

module.exports = server;