const Category = require('../models/categoryModel');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

// Utility to capitalize first letter of category name
const capitalizeName = (str) => {
  if (!str) return '';
  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
};

// Create Category
const createCategory = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const rawName = req.body?.name;
    const name = capitalizeName(rawName);
    const image = req.file ? req.file.filename : null;
    const createdBy = req.user.id;

    if (!name) {
      return res.status(400).send({ message: "Category name is required" });
    }

    if (!image) {
      return res.status(400).send({ message: "Category image is required" });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (req.file && !allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).send({ message: 'Invalid image format. Allowed: JPEG, PNG, WEBP.' });
    }

    const existing = await Category.findOne({ where: { name } });
    if (existing) {
      return res.status(409).send({ message: "Category already exists" });
    }

    const newCategory = await Category.create({ name, image, createdBy });

    res.status(200).send({
      message: "Category created successfully",
      category: newCategory,
      success: true
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).send({ error: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });

    const modified = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      image: cat.image ? `http://localhost:7001/uploads/${cat.image}` : null
    }));

    res.status(200).send({ categories: modified, success: true });
  } catch (error) {
    console.error("Get All Categories Error:", error);
    res.status(500).send({ error: error.message });
  }
};

// Get Category by ID
const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found', success: false });
    }

    res.status(200).send({
      category: {
        id: category.id,
        name: category.name,
        image: category.image ? `http://localhost:7001/uploads/${category.image}` : null
      },
      success: true
    });
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    res.status(500).send({ error: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const { id } = req.params;
    let name = req.body.name;
    const updatedBy = req.user.id;

    if (!id) {
      return res.status(400).json({ message: 'Category ID is required in URL.' });
    }

    if (req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).send({ message: 'Invalid image format. Allowed: JPEG, PNG, WEBP.' });
      }
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.', success: false });
    }

    const existing = await Category.findOne({
      where: { name, id: { [Op.ne]: id } }
    });
    if (existing) {
      return res.status(409).json({ message: "Another category with this name already exists." });
    }

    name = capitalizeName(name);

    if (req.file && category.image) {
      const oldPath = path.join(__dirname, '../uploads', category.image);
      fs.unlink(oldPath, (err) => {
        if (err) console.error('Failed to delete old image:', err);
      });
    }

    const image = req.file ? req.file.filename : category.image;

    await Category.update({ name, image, updatedBy }, { where: { id } });

    const updatedCategory = await Category.findByPk(id);

    res.status(200).json({
      message: 'Category updated successfully.',
      data: updatedCategory,
      success: true
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found', success: false });
    }

    if (category.image) {
      const imgPath = path.join(__dirname, '../uploads', category.image);
      fs.unlink(imgPath, (err) => {
        if (err) console.error('Failed to delete image:', err);
      });
    }

    await Category.destroy({ where: { id } });

    res.status(200).send({ message: 'Category deleted successfully', success: true });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByID,
  updateCategory,
  deleteCategory
};
