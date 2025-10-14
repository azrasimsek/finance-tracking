const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      
    },
    currency_code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        isUppercase: true, // TRY gibi büyük harf zorunluluğu
        len: [3, 3]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // Varsayılan "Seçiniz" kategorisi
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false
    }

  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: "last_updated",
    underscored: true
  }
);


module.exports= Transaction;