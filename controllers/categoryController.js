const Category = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name, image, createdBy } = req.body;

    const newCategory = await Category.create({
      name,
      image,
      createdBy
    });

    res.status(201).send({
      message: 'Category created successfully',
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get category by ID
const getCategoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found', success: false });
    }

    res.status(200).send({ category, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, updatedBy } = req.body;

    const [updated] = await Category.update(
      { name, image, updatedBy },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).send({ message: 'Category not found', success: false });
    }

    res.status(200).send({ message: 'Category updated successfully', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: 'Category not found', success: false });
    }

    res.status(200).send({ message: 'Category deleted successfully', success: true });
  } catch (error) {
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
