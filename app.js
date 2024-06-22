const express = require('express');
const app = express();
//start local server
const Product = require('./models/product');

const cors = require('cors');
const connectDB = require('./database');
const productController = require('./controllers/productController');


// Middleware
app.use(express.json());//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.get('/api/products/search', productController.searchProducts);
app.delete('/api/products/deleteAll', productController.deleteAllProducts);
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.createProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const sampleProducts = [
  {
    name: "Ergonomic Desk Chair",
    description: "Comfortable office chair with lumbar support and adjustable height.",
    price: 199.99,
    quantity: 50,
    category: "Furniture"
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "Over-ear headphones with noise cancellation and 30-hour battery life.",
    price: 149.99,
    quantity: 100,
    category: "Electronics"
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated 32oz bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    quantity: 200,
    category: "Kitchen"
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable t-shirt made from 100% organic cotton.",
    price: 19.99,
    quantity: 150,
    category: "Clothing"
  },
  {
    name: "Smart Home Security Camera",
    description: "1080p HD camera with night vision and two-way audio.",
    price: 79.99,
    quantity: 75,
    category: "Electronics"
  },
  {
    name: "Non-Stick Cooking Pan Set",
    description: "Set of 3 durable non-stick pans in various sizes.",
    price: 59.99,
    quantity: 80,
    category: "Kitchen"
  },
  {
    name: "Yoga Mat",
    description: "Extra thick, non-slip yoga mat with carrying strap.",
    price: 29.99,
    quantity: 120,
    category: "Sports"
  },
  {
    name: "LED Desk Lamp",
    description: "Adjustable lamp with multiple brightness levels and color temperatures.",
    price: 39.99,
    quantity: 90,
    category: "Lighting"
  },
  {
    name: "Portable Power Bank",
    description: "10000mAh battery pack with fast charging capability.",
    price: 34.99,
    quantity: 180,
    category: "Electronics"
  },
  {
    name: "Leather Wallet",
    description: "Slim, RFID-blocking wallet with multiple card slots.",
    price: 44.99,
    quantity: 100,
    category: "Accessories"
  }
];

app.get('/seed', async (req, res) => {
  try {

    for(let i = 0; i < sampleProducts.length; i++){
      const product = new Product({
        name: sampleProducts[i].name,
        description: sampleProducts[i].description,
        price: sampleProducts[i].price,
        quantity: sampleProducts[i].quantity,
        category: sampleProducts[i].category,
        // Add other fields from the request body
      });
      await product.save();
      
    }
    res.send('Database seeded!'); //put res outside of for loop, so heading would be sent only once
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
}
) ;