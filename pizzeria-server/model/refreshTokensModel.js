const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const User = require("./userModel");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DB_ENABLE_SSL
      ? {
          require: process.env.DB_ENABLE_SSL ? true : false,
          rejectUnauthorized: false,
        }
      : false,
  },
});

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
