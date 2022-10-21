const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

// Define collection and schema
let Product = new Schema({
   _id: {
      type: Types.ObjectId
   },
   name: {
      type: String
   },
   price: {
      type: Number
   }
}, {
   collection: 'products'
})

module.exports = mongoose.model('Product', Product)