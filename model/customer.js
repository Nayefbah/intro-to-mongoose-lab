const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const customer = mongoose.model('customer', CustomerSchema)
module.exports = customer
