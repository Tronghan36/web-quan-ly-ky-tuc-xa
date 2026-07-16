const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dateOfBirth: { type: Date, required: true },
  major: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  status: { type: String, enum: ['Active', 'Inactive', 'Graduated'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);