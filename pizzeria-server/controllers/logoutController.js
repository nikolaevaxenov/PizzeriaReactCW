const refreshTokensModel = require("../model/refreshTokensModel");

const handleLogout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(204);
  const refreshToken = cookies.refreshToken;

  const foundUser = refreshTokensModel
    .findOne({
      where: {
        refreshToken: refreshToken,
      },
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });

  if (!foundUser) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }
  const result = refreshTokensModel.destroy({
    where: {
      refreshToken: refreshToken,
    },
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.sendStatus(204);
};

module.exports = handleLogout;
