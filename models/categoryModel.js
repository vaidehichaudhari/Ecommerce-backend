const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db');

const Brand = sequelize.define('Brand', {
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
  tableName: 'Brands',
  timestamps: false, // handles createdAt and updatedAt automatically
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Brand;
