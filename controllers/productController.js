const Product = require('../models/productModel');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, brand_id, Quantity, InStock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      category_id,
      brand_id,
      Quantity,
      InStock
    });

    res.status(201).json({ message: 'Product created successfully', success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product', success: false, error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products', success: false, error: error.message });
  }
};

// Get product by ID
const getProductByID = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found', success: false });

    res.status(200).json({ product, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch product', success: false, error: error.message });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found', success: false });

    await product.update(req.body);
    res.status(200).json({ message: 'Product updated successfully', success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', success: false, error: error.message });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found', success: false });

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', success: false, error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
};
