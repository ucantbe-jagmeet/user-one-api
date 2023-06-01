const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

// parse json here
app.use(express.json());

app.use("/login", authRouter);
app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
