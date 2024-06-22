const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    // Add other fields from the request body
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); //await ar
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // json inside {};
    }
    //
    product.name = req.body.name || product.name; // if req.body.name is undefined, use product.name
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    // Update other fields from the request body

    const updatedProduct = await product.save(); //await ar
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product found and removed');
    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search for products by name
exports.searchProducts = async (req, res) => {
  const keyword = req.query.name;
  if (!keyword) {
    return res.status(400).json({ message: 'Please provide a search keyword' });
    console.log('Please provide a search keyword');
  }

  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};
