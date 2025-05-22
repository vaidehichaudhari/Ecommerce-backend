const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
      name, description, price, rating, quantity,
      inStock, image, categoryId, brandId, createdBy
    } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      rating,
      quantity,
      inStock,
      image,
      categoryId,
      brandId,
      createdBy
    });

    res.status(201).send({ message: 'Product created successfully', success: true, product: newProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Brand, as: 'Brands' },
        { model: Category, as: 'Categories' }
      ]
    });
    res.status(200).send({ success: true, products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get product by ID
const getProductByID = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Brand, as: 'Brands' },
        { model: Category, as: 'Categories' }
      ]
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    res.status(200).send({ success: true, product });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name, description, price, rating, quantity,
      inStock, image, categoryId, brandId, updatedBy
    } = req.body;

    const [updated] = await Product.update({
      name,
      description,
      price,
      rating,
      quantity,
      inStock,
      image,
      categoryId,
      brandId,
      updatedBy
    }, {
      where: { id }
    });

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

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.findAll({
      where: { categoryId },
      include: [{ model: Category, as: 'Categories' }]
    });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by brand
const getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    const products = await Product.findAll({
      where: { brandId },
      include: [{ model: Brand, as: 'Brands' }]
    });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
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
