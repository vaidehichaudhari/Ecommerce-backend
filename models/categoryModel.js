const {DataTypes} = require('sequelize')
const {sequelize} = require('../confiq/db')


const Category = sequelize.define('Category',{
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
    tableName:'Categories',
    timeStamp:false         //at created updated table it is true, otherwise false
})


module.exports = Category