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

//figure out later
//   UserSchema.virtual("password")
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });
// UserSchema.path("hashed_password").validate(function (v) {
//   if (this._password && this._password.length < 6) {
//     this.invalidate("password", "Password must be at least 6 characters.");
//   }
//   if (this.isNew && !this._password) {
//     this.invalidate("password", "Password is required");
//   }
// }, null);






//data model Product, by passing the schema as 'productSchema', we are creating a new collection called 'products'
  const Product = mongoose.model('product', productSchema);

  module.exports = Product;