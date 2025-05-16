const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db'); // now correctly importing the instance

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
  }
}, {
  tableName: 'Brands',
  timestamps: false
});

module.exports = Brand;
