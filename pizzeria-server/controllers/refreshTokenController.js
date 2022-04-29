const refreshTokensModel = require("../model/refreshTokensModel");
const { verify, sign } = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);

  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  const foundUser = refreshTokensModel
    .findOne({
      where: {
        refreshToken: refreshToken,
      },
    })
    .then((result) => {
      console.log(result);
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
          console.log("Okay!");
          return res.status(201).json({ accessToken });
        }
      );
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

module.exports = handleRefreshToken;
