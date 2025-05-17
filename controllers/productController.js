const Product = require('../models/productModel')


const createProduct = async(req,res)=>{
    console.log(req.body)
    const {name} = req.body
try {
    const newProduct= await Product.create({name})
    res.status(200).send({message:'Product created successfully',success:true})
} catch (error) {
    res.status(500).send({error:error})
}
}
 const getAllProducts = async(req,res)=>{
    try {
        const products= await Product.findAll()
    res.status(200).send({products:products,success:true})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}


module.exports = {
    createProduct, getAllProducts, 
    
}