const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const connectDB = require("./db/connect");
require("dotenv").config();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// parse json here
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
