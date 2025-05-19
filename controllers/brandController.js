const Brand = require('../models/brandModel');

// Create a new brand
const createBrand = async (req, res) => {
  try {
    const { name, image,createdBy  } = req.body;

    const newBrand = await Brand.create({
      name,
      image,
    createdBy
    });

    res.status(201).send({
      message: 'Brand created successfully',
      success: true,
      data: newBrand
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).send({ brands, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get brand by ID
const getBrandByID = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).send({ message: 'Brand not found', success: false });
    }

    res.status(200).send({ brand, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update brand by ID

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, updatedBy } = req.body;

    // Validate ID
    if (!id) {
      return res.status(400).json({ message: 'Brand ID is required in URL.' });
    }

    // Check if brand exists
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }

    // Update the brand
    await Brand.update(
      { name, image, updatedBy },
      { where: { id } }
    );

    // Fetch updated brand
    const updatedBrand = await Brand.findByPk(id);
    res.status(200).json({ message: 'Brand updated successfully.', data: updatedBrand });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message });
  }
};


// Delete brand by ID
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Brand.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: 'Brand not found', success: false });
    }

    res.status(200).send({ message: 'Brand deleted successfully', success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandByID,
  updateBrand,
  deleteBrand
};
