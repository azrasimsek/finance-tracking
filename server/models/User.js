const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define(
  'User',
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default.jpg'
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    author: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    updatedAt: false,
    underscored: true
  }
);

module.exports= User;