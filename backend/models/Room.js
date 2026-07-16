const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  type: { type: String, enum: ['Single', 'Double', 'Triple', 'Quad'], required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);