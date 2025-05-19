const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Brand = require('../models/brandModel');
// Create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send({ message: 'Product created successfully', success: true, product: newProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send({ products, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get product by ID
const getProductByID = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }
    res.status(200).send({ product, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    res.status(200).send({ message: 'Product updated successfully', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    res.status(200).send({ message: 'Product deleted successfully', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // or req.query.categoryId

    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID is required' });
    }

    // Fetch all products with matching categoryId
    const products = await Product.findAll({
      where: { categoryId }
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('getProductsByCategory error:', error);
    res.status(500).json({ error: error.message });
  }

};

const getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;  // or req.query.brandId

    if (!brandId) {
      return res.status(400).json({ message: 'Brand ID is required' });
    }

    const products = await Product.findAll({
      where: { brandId }
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this brand' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('getProductsByBrand error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByBrand
};
