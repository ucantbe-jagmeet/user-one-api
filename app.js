const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const connectDB = require("./db/connect");
require("dotenv").config();

// parse json here
app.use(express.json());

app.use("/login", authRouter);
app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server is listening on port 3000...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
