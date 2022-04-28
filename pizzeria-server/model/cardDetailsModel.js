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

const CardDetails = sequelize.define("Card_details", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  card_number: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  expiry_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvc_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(CardDetails);
CardDetails.belongsTo(User);

module.exports = CardDetails;
