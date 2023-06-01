const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
      minlength: 3,
      maxlength: [30, "name can not be more than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "must provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Provide valid email",
      ],
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "non-active"],
      default: "non-active",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
