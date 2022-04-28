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
const User = require("./userModel");

const Address = sequelize.define("Address", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  house_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  housing_number: {
    type: DataTypes.STRING,
  },
  apartment_number: {
    type: DataTypes.STRING,
  },
  intercom_code: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Address);
Address.belongsTo(User);

module.exports = Address;
