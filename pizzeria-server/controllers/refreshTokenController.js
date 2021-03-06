const refreshTokensModel = require("../model/refreshTokensModel");
const { verify, sign } = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  const foundUser = refreshTokensModel
    .findOne({
      where: {
        refreshToken: refreshToken,
      },
    })
    .then((result) => {
      if (!result) return res.sendStatus(403);
      verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || result.UserId !== decoded.id) return res.sendStatus(403);
          const accessToken = sign(
            { email: decoded.email, id: decoded.id },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
              expiresIn: "5m",
            }
          );
          return res.status(201).json({
            userID: decoded.id,
            accessToken: accessToken,
          });
        }
      );
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

module.exports = handleRefreshToken;
