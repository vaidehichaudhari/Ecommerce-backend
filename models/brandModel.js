const {DataTypes} = require('sequelize')
const sequelize = require('../confiq/db')


const Brand = sequelize.define('Brand',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true
    }
},{
    tableName:'Brands',
    timestamps:  false  //at created updated table it is true, otherwise false
})


module.exports = Brand;