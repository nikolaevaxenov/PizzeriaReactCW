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
