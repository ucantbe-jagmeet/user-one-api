const express = require("express");
const app = express();
let { people } = require("./data");

// parse json here
app.use(express.json());

app.get("/api/v1/user", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/v1/user", (req, res) => {
  const { id, name } = req.body;
  const newUser = { id: id, name: name };
  const updatedUser = [...people, newUser];

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res.status(201).json({ success: true, newUser });
});

app.post("/api/v1/user/display", (req, res) => {
  const { id, name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res
    .status(201)
    .json({ success: true, data: [...people, { id: id, name: name }] });
});

app.put("/api/v1/user/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = people.find((user) => user.id === Number(id));

  if (!user) {
    return res
      .status(404)
      .json({ success: false, msg: `user doesn't exist with this id:${id}` });
  }

  const newUser = people.map((user) => {
    if (user.id === Number(id)) {
      user.name = name;
    }
    return user;
  });

  res.status(200).json({ success: true, data: newUser });
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
