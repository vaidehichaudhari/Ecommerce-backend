const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db'); // Make sure this path is correct

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
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
  timestamps: false, // enables createdAt and updatedAt
  // createdAt: 'createdAt',
  // updatedAt: 'updatedAt'
});

module.exports = Brand;
