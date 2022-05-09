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
