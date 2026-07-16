const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  violationType: { type: String, enum: ['Noise', 'Cleanliness', 'Unauthorized Guest', 'Alcohol/Drugs', 'Damage', 'Other'], required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ['Minor', 'Major', 'Severe'], required: true },
  penalty: Number,
  resolveDate: Date,
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Violation', violationSchema);