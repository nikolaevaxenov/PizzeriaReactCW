const userModel = require("../model/userModel");

const getAllUsers = async (req, res) => {
  return res.json(await userModel.findAll());
};

const createNewUser = async (req, res) => {
  try {
    const result = await userModel.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
    });
    return res.status(201).json({ message: `New user id=${result.id} added` });
  } catch (err) {
    return res.status(208).json({ message: `${err}` });
  }
};

const updateUser = async (req, res) => {
  const result = await userModel.update(
    {
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      middle_name: req.body.middle_name,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
  if (result[0] === 0) {
    return res
      .status(400)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `User with id=${req.body.id} updated` });
};

const deleteUser = async (req, res) => {
  const result = await userModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!result) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  return res
    .status(201)
    .json({ message: `User ID ${req.params.id} successfully deleted` });
};

const getUser = async (req, res) => {
  const result = await userModel.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (result.length === 0) {
    return res
      .status(400)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  return res.status(201).json(result);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
