const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./database');
const productController = require('./controllers/productController');




// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.createProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);
app.delete('/api/products', productController.deleteAllProducts);
app.get('/api/products/search', productController.searchProducts);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// //faker data
// const Product = require('./models/product');
// const { generateProducts } = require('./seedData');
// app.get('/seed', async (req, res) => {
//   try {
//     const numProducts = 50; // Number of dummy products to generate
//     const products = generateProducts(numProducts);

//     // Insert dummy products into the database
//     await Product.insertMany(products);

//     res.json({ message: `Inserted ${numProducts} dummy products` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });