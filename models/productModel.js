const { DataTypes } = require('sequelize');
const { sequelize } = require('../confiq/db');
const Brand = require('./brandModel')
const Category = require('./categoryModel')

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  brandId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'Products',
  timestamps: false,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

module.exports = Product;

//Associations with category and brand

Product.belongsTo(Brand, {
    foreignKey:'id',
    as:'Brands'
})

Product.belongsTo(Category, {
    foreignKey:'id',
    as:'Categories'
})