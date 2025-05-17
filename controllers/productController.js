const Product = require('../models/productModel');

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
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct
};
