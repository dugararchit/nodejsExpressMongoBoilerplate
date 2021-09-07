const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    min: 6,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 40,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 100,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', user);
