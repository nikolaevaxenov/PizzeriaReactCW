const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userModel = require("../model/userModel");
const refreshTokensModel = require("../model/refreshTokensModel");
const createToken = require("../services/jwtCreateToken");

const registerUser = (req, res) => {
  const { email, password, first_name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const result = userModel.create({
        email: email,
        password: hash,
        first_name: first_name,
      });
      return result;
    })
    .then((result) => {
      const [accessToken, refreshToken] = createToken(result);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
      });
      refreshTokensModel.create({
        UserId: result.id,
        refreshToken: refreshToken,
      });
      res.status(201).json({ accessToken });
    })
    .catch((err) => {
      return res.status(208).json({ message: `${err}` });
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({
      where: {
        email: email,
      },
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
  if (!user) {
    res.status(400).json({ message: "User doesn't exist!" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ message: "Wrong username, password combination" });
      } else {
        const [accessToken, refreshToken] = createToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 60 * 60 * 24 * 30 * 1000,
        });
        refreshTokensModel.create({
          UserId: user.id,
          refreshToken: refreshToken,
        });
        res.status(201).json({ accessToken });
      }
    });
  }
};

const getAllUsers = async (req, res) => {
  return res.json(await userModel.findAll());
};

const updateUser = async (req, res) => {
  console.log(req.body);
  const result = await userModel.update(
    {
      email: req.body.email,
      phone_number: Number(req.body.phone_number),
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

const updatePasswordUser = async (req, res) => {
  console.log(req.body);

  const user = await userModel
    .findOne({
      where: {
        id: req.body.id,
      },
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
  if (!user) {
    res.status(400).json({ message: "User doesn't exist!" });
  } else {
    bcrypt.compare(req.body.oldPassword, user.password).then((match) => {
      if (!match) {
        res.status(401).json({ message: "Wrong password" });
      } else {
        bcrypt
          .hash(req.body.newPassword, 10)
          .then((hash) => {
            const result = userModel.update(
              {
                password: hash,
              },
              {
                where: {
                  id: req.body.id,
                },
              }
            );

            return result;
          })
          .then((result) => {
            if (result[0] === 0) {
              return res
                .status(400)
                .json({ message: `User ID ${req.body.id} not found` });
            }
            return res
              .status(201)
              .json({ message: `User with id=${req.body.id} updated` });
          });
      }
    });
  }
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
    attributes: [
      "email",
      "first_name",
      "last_name",
      "middle_name",
      "phone_number",
    ],
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
  registerUser,
  loginUser,
  updateUser,
  updatePasswordUser,
  deleteUser,
  getUser,
};
