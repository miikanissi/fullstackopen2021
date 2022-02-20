const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})

module.exports = mongoose.model('Todo', todoSchema)