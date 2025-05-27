const Brand = require('../models/brandModel');

// Create a new brand
const createBrand = async (req, res) => {
  console.log(req.body);
  console.log(req.user.isAdmin, "Is admin");

  const name = req.body.name.trim().toLowerCase(); // normalize name
  const image = req.file ? req.file.filename : null;

  try {
    if (!req.user.isAdmin) {
      return res.status(401).send({ message: "Not Authorized" });
    }

    const existingBrand = await Brand.findOne({ where: { name } }); // correct Sequelize usage
    console.log(existingBrand, "existingBrand");

    if (existingBrand) {
      return res.status(409).send({ message: "Brand already exists" });
    }

    const newBrand = await Brand.create({ name, image });
    res.status(200).send({ message: "Brand created successfully", success: true });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({ order: [['name', 'ASC']] });

    const modifiedBrands = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      image: `http://localhost:7000/uploads/${brand.image}`
    }));

    res.status(200).send({ brands: modifiedBrands, success: true });

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
  if(!req.user.isAdmin){
        res.status(401).send({message:"Not Authorized"})
    }
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
  if(!req.user.isAdmin){
        res.status(401).send({message:"Not Authorized"})
    }
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
