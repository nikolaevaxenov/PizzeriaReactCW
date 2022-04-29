const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const User = require("./userModel");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  }
);

const RefreshTokens = sequelize.define("Refresh_tokens", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    unique: true,
  },
});

User.hasMany(RefreshTokens);
RefreshTokens.belongsTo(User);

module.exports = RefreshTokens;
