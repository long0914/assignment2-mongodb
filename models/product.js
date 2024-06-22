const mongoose =require('mongoose');


//create a schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  });

//data model Product, by passing the schema as 'productSchema', we are creating a new collection called 'products'
  const Product = mongoose.model('product', productSchema);

  module.exports = Product;