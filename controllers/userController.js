let { people } = require("../data");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllUser = async (req, res) => {
  const user = await User.find();
  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const getUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });

  if (!user) {
    throw new NotFoundError(`No user with id ${userID}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const { name, email, status, gender } = req.body;

  if (name === "" || email === "" || status === "" || gender === "") {
    throw new BadRequestError(`Name or email fields can not be empty`);
  }
  const user = await User.findByIdAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`No user with id ${userID}`);
  }
  res.status(STatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.params;

  const user = await User.findByIdAndRemove({ _id: userID });

  if (!user) {
    throw new NotFoundError(`No user with id ${userID}`);
  }
  res.status(StatusCodes.OK).send("User deleted");
};

module.exports = {
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
