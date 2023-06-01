const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

// parse json here
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.post("/login", (req, res) => {
  const { name } = rq.body;
  if (name) {
    return res.status(200).send(`welcome ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
