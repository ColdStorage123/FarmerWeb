const mongoose = require('mongoose');

const coldStorageSchema = new mongoose.Schema({
  managerid: {
    type: mongoose.Schema.Types.ObjectId,  // Assuming userId is of ObjectId type in MongoDB
    required: true,
  },  

  coldStorageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'], // Status can be 'pending', 'accepted', or 'rejected'
    default: 'pending', // Default status is 'pending'
  },


  images: [{ type: String }], // Array of image URIs
});

const ColdStorage = mongoose.model('ColdStorage', coldStorageSchema);

module.exports = ColdStorage;