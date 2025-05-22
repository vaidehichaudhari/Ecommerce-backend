const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser =async(req,res) =>{
const {name,email,password,isAdmin } = req.body
    try {
        // const existingUser = findOne({email})
        // console.log(existingUser);
        // if(existingUser){
        //     res.status(200).send({message:"User already exist",success:false})
        // }
        const newUser = await User.create({name,email,password,isAdmin })
        res.status(200).send({message:"User registered successfully", success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}

const LoginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const loggedInUser = await User.findOne({where:{email:req.body.email,password:req.body.password},attributes: ['id', 'isAdmin']})

        // console.log(loggedInUser, "Login user") ;
        const user = loggedInUser.dataValues
        console.log(user,"User data****")
        const token = jwt.sign(user,process.env.SECRATE_KEY,{expiresIn:'2h'})
        console.log(token,"Token")
        res.status(200).send({message:"User Loggin successfully", success:true,token:token})
        
    } catch (error) {
        res.status(500).send({error:error.message})
        
    }
}

const getUserInfo = async(req,res) =>{
   console.log("req.user",req.user)
    try {

        loggedUser = await User.findOne({where:{id:req.user.id},attributes: ['id','name','email','isAdmin']})
res.status(200).send({message:"got user info",loggedUser:loggedUser})
            
    } catch (error) {
        res.status(500).send({error:error})
        
    }

}

module.exports = {
    registerUser,
    LoginUser,
    getUserInfo
}