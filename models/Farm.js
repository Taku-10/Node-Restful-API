const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  crops: [
    {
      name: String,
      type: String,
      quantity: Number
    }
  ],
  employees: [
    {
      name: String,
      position: String,
      salary: Number
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
