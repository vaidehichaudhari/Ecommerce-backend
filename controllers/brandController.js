const Brand = require('../models/brandModel') 


const createBrand = async(req,res)=>{
    console.log(req.body)
    const {name} = req.body
try {
    const newBrand = await Brand.create({name})
    res.status(200).send({message:'Brand created successfully',success:true})
} catch (error) {
    res.status(500).send({error:error})
}
}
// http://localhost:7001/api/brand/create

// {
//     "name":"Puma"
// }


 const getAllBrands = async(req,res)=>{
    try {
        const brands = await Brand.findAll()
    res.status(200).send({brands:brands,success:true})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}


 const getBrandByID =(req,res)=>{
    try {
    res.status(200).send({message:'success'})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}

 const updateBrand = (req,res)=>{
    try {
    res.status(200).send({message:'success'})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}

 const deleteBrand =(req,res)=>{
    try {
    res.status(200).send({message:'success'})
        
    } catch (error) {
    res.status(500).send({error:error})
        
    }
}

module.exports = {
    createBrand, getAllBrands, 
    // getBrandByID, updateBrand, deleteBrand
}