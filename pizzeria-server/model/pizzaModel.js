const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
  }
);

const Pizza = sequelize.define("Pizza", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_26: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_30: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_40: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pizza;
