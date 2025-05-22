const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = (req,res,next) =>{
    // console.log(req.headers,"This is headers*****")
tokenBearer = req.headers.authorization
    // console.log(tokenBearer,"Token with Bearer")
if(!tokenBearer?.startsWith('Bearer ')){
    res.send({message:"Invalid authorization header"})
}
let token = tokenBearer.split(' ')
token = token[1]
// console.log(token)
let decoded = jwt.verify(token,process.env.SECRATE_KEY)
console.log(decoded)
req.user = decoded   //{id:decoded.id,isAdmin:decoded.isAdmin}

next()
}


module.exports = {auth}