const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><a href='/api/products'>Products</a>");
});

app.get("/about", (req, res) => {
  res.status(200).json([{ msg: "About page" }]);
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
