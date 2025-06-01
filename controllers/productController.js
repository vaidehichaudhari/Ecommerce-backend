const Product = require('../models/productModel');
const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const fs = require('fs');
const path = require('path');

// Create Product
const createProduct = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    const {
      name, description, price, rating, quantity,
      inStock, categoryId, brandId
    } = req.body;

    const createdBy = req.user.id;
    const image = req.file ? req.file.filename : null;

    if (!name) return res.status(400).send({ message: 'Product name is required' });
    if (!image) return res.status(400).send({ message: 'Product image is required' });

    // Validate image mimetype
    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).send({ message: 'Invalid image format. Allowed: JPEG, PNG, WEBP.' });
      }
    }

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
      createdBy  // set from req.user.id
    });

    res.status(201).send({
      message: 'Product created successfully',
      success: true,
      product: {
        ...newProduct.toJSON(),
        image: newProduct.image ? `http://localhost:7001/uploads/${newProduct.image}` : null
      }
    });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).send({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Brand, as: 'Brands' },
        { model: Category, as: 'Categories' }
      ],
      order: [['name', 'ASC']]
    });

    const modifiedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      rating: p.rating,
      quantity: p.quantity,
      inStock: p.inStock,
      categoryId: p.categoryId,
      brandId: p.brandId,
      createdBy: p.createdBy,
      updatedBy: p.updatedBy,
      image: p.image ? `http://localhost:7001/uploads/${p.image}` : null,
      Categories: p.Categories,
      Brands: p.Brands
    }));

    res.status(200).send({ products: modifiedProducts, success: true });
  } catch (error) {
    console.error('Get All Products Error:', error);
    res.status(500).send({ error: error.message });
  }
};

// Get Product by ID
const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        { model: Brand, as: 'Brands' },
        { model: Category, as: 'Categories' }
      ]
    });

    if (!product) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    res.status(200).send({
      product: {
        ...product.toJSON(),
        image: product.image ? `http://localhost:7001/uploads/${product.image}` : null
      },
      success: true
    });
  } catch (error) {
    console.error('Get Product by ID Error:', error);
    res.status(500).send({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    const { id } = req.params;

    const {
      name, description, price, rating, quantity,
      inStock, categoryId, brandId
    } = req.body;

    const updatedBy = req.user.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    // Validate image mimetype if new file uploaded
    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).send({ message: 'Invalid image format. Allowed: JPEG, PNG, WEBP.' });
      }
    }

    // Delete old image if new one uploaded
    if (req.file && product.image) {
      const oldImagePath = path.join(__dirname, '../uploads', product.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error('Failed to delete old product image:', err);
      });
    }

    const image = req.file ? req.file.filename : product.image;

    await Product.update({
      name,
      description,
      price,
      rating,
      quantity,
      inStock,
      categoryId,
      brandId,
      image,
      updatedBy  // set from req.user.id
    }, { where: { id } });

    const updatedProduct = await Product.findByPk(id);

    res.status(200).send({
      message: 'Product updated successfully',
      success: true,
      product: {
        ...updatedProduct.toJSON(),
        image: updatedProduct.image ? `http://localhost:7001/uploads/${updatedProduct.image}` : null
      }
    });
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).send({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: 'Not Authorized' });
    }

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found', success: false });
    }

    // Delete image file from uploads folder
    if (product.image) {
      const imagePath = path.join(__dirname, '../uploads', product.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to delete product image:', err);
      });
    }

    await Product.destroy({ where: { id } });

    res.status(200).send({ message: 'Product deleted successfully', success: true });
  } catch (error) {
    console.error('Delete Product Error:', error);
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

    const modifiedProducts = products.map(p => ({
      ...p.toJSON(),
      image: p.image ? `http://localhost:7001/uploads/${p.image}` : null
    }));

    res.status(200).json({ success: true, data: modifiedProducts });
  } catch (error) {
    console.error('Get Products by Category Error:', error);
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

    const modifiedProducts = products.map(p => ({
      ...p.toJSON(),
      image: p.image ? `http://localhost:7001/uploads/${p.image}` : null
    }));

    res.status(200).json({ success: true, data: modifiedProducts });
  } catch (error) {
    console.error('Get Products by Brand Error:', error);
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
