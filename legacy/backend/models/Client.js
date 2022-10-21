const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;

// Define collection and schema
let Client = new Schema({
   _id: {
      type: Types.ObjectId
   },
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: String
   },
   streetName: {
      type: String
   },
   houseNumber: {
      type: String
   },
   city: {
      type: String
   },
   state: {
      type: String
   },
   country: {
      type: String
   },
   zipCode: {
      type: String
   } 
}, {
   collection: 'clients'
})

module.exports = mongoose.model('Client', Client)