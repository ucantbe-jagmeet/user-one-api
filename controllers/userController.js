let { people } = require("../data");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");

const getAllUser = async (req, res) => {
  const user = await User.find();
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const getUser = async (req, res) => {
  res.status(StatusCodes.OK).send("single USer");
};
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = (req, res) => {
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
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = people.find((user) => user.id === Number(id));

  if (!user) {
    return res
      .status(404)
      .json({ success: false, msg: `user doesn't exist with this id:${id}` });
  }

  const newUser = people.filter((user) => user.id !== Number(id));

  res.status(200).json({ success: true, data: newUser });
};

module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
