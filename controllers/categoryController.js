const Category = require('../models/categoryModel')


const createCategory = async(req,res)=>{
    console.log(req.body)
    const {name} = req.body
try {
    const newCategory= await Category.create({name})
    res.status(200).send({message:'category created successfully',success:true})
} catch (error) {
    res.status(500).send({error:error})
}
}
 const getAllCategories = async(req,res)=>{
    try {
        const categories= await Category.findAll()
    res.status(200).send({categories:categories,success:true})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}


module.exports = {
    createCategory, getAllCategories, 
    
}