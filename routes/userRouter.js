const express = require("express");
const router = express.Router();
const {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
