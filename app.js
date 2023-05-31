const express = require("express");
const app = express();
let { people } = require("./data");

// parse json here
app.use(express.json());

app.get("/api/user", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/user", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res.status(201).json({ success: true, user: name });
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
