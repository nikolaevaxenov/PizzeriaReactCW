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
const Order = require("./orderModel");
const Pizza = require("./pizzaModel");

const OrderPizza = sequelize.define("Order_pizza", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.hasMany(OrderPizza);
OrderPizza.belongsTo(Order);

Pizza.hasMany(OrderPizza);
OrderPizza.belongsTo(Pizza);

module.exports = OrderPizza;
