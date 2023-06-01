let { people } = require("../data");
const User = require("../models/userSchema");

const getUser = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);

  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res.status(201).json({ success: true, user });
};

const createUserDisplay = (req, res) => {
  const { id, name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please Provide name value" });
  }
  res
    .status(201)
    .json({ success: true, data: [...people, { id: id, name: name }] });
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
  createUser,
  createUserDisplay,
  updateUser,
  deleteUser,
};
