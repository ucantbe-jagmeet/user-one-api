const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  createUserDisplay,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUser);
router.post("/", createUser);
router.post("/display", createUserDisplay);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
