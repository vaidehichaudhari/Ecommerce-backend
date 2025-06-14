const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const { sequelize, connectDB } = require('./confiq/db'); 
//const Brand = require('./models/brandModel');
//const Product=require('./models/productModel');
//const Category=require('./models/categoryModel');
app.use(express.json());

// For form data (e.g., file uploads + text fields)
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Needed if using cookies or auth headers
}));


// Routes
const brandRoute = require('./routes/brandRoute');
app.use('/api/brand', brandRoute);

const productRoute = require('./routes/productRoute');
app.use('/api/product', productRoute);

const categoryRoute = require('./routes/categoryRoute');
app.use('/api/category', categoryRoute);

const userRoute = require('./routes/userRoute')
app.use('/api/user', userRoute);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sync DB & start server
(async () => {
  try {
    await connectDB(); // optional, but good for testing the connection
    await sequelize.sync({ alter:false }); 
    console.log('Database & tables synced!');

    app.listen(7001, () => {
      console.log('Server running on port 7001');
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
})();
