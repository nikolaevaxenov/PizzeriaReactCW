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
const Address = require("./addressModel");
const CardDetails = require("./cardDetailsModel");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "In Progress",
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(Order);
Order.belongsTo(User);

Address.hasMany(Order);
Order.belongsTo(Address);

CardDetails.hasMany(Order);
Order.belongsTo(CardDetails);

module.exports = Order;
