const { sign } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, id: user.id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  const refreshToken = sign(
    { email: user.email, id: user.id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return [accessToken, refreshToken];
};

module.exports = createTokens;
