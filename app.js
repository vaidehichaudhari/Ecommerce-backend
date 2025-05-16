const express=require('express')
const cors=require('cors')
const app =express()
require('dotenv').config()
require('./confiq/db')
const port=process.env.PORT | 7001
app.use(express.json())
app.use(cors())
const brandRoute=require('./routes/brandRoute')
app.use('/api/brand',brandRoute)




app.get('/',(req,res)=>res.send("Hello world"))



app.listen(port,()=>console.log(`example app running on port${port}`))