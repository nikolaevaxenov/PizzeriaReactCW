const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  verify(
    accessToken.split(" ")[1],
    process.env.JWT_ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.id = decoded.id;
      req.email = decoded.email;
      next();
    }
  );
};

module.exports = validateToken;
