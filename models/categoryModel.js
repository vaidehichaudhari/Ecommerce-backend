const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Categories',
  timestamps: false, // adds createdAt and updatedAt
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Category;
