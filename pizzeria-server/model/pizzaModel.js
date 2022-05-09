const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

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
