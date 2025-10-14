const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Transaction = require('./Transaction');

const Categories = sequelize.define(
  'Categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'categories',
    timestamps: false
  }
);

Categories.beforeDestroy(async (category, options) => {
  await Transaction.update(
    { category_id: 1 }, // "Seçiniz" kategorisi ID=1
    { where: { category_id: category.id } }
  );
});

module.exports= Categories;