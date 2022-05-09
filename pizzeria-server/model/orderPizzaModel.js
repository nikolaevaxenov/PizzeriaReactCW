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
