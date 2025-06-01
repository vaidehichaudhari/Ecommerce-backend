const multer = require('multer');
const path = require('path');

// Common file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Reusable storage creator
const createStorage = (prefix) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${prefix}-${Date.now()}${ext}`);
    }
  });

// Export separate upload instances
const uploadBrand = multer({ storage: createStorage('brand'), fileFilter });
const uploadCategory = multer({ storage: createStorage('category'), fileFilter });
const uploadProduct = multer({ storage: createStorage('product'), fileFilter });

module.exports = {
  uploadBrand,
  uploadCategory,
  uploadProduct
};
