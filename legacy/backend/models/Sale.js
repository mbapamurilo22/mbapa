const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

// Define collection and schema
let Sale = new Schema({
   _id: {
      type: Types.ObjectId
   },
   clientId: {
      type: String
   },
   clientName: {
      type: String
   },
   products: {
      type: []
   }
}, {
   collection: 'sales'
})

module.exports = mongoose.model('Sale', Sale)