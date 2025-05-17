const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db'); 

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

}, {
  tableName: 'Products',
  timestamps: true // Sequelize will auto-manage createdAt and updatedAt
});
module.exports = Product;
