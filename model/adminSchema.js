const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

module.exports = mongoose.model('Admin', adminSchema);
