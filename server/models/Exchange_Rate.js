const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Exchange_Rate = sequelize.define(
  'Exchange_Rate',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    currency_code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      validate: {
        isUppercase: true, // TRY gibi büyük harf zorunluluğu
        len: [3, 3]
      }
    },
    rate: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    }
  },
  {
    timestamps: true,
    updatedAt: "last_updated",
    underscored: true
  }
);

module.exports= Exchange_Rate;