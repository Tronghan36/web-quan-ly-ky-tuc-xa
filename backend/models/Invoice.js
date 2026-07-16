const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  month: { type: Date, required: true },
  roomPrice: Number,
  electricityUsage: Number,
  electricityPrice: Number,
  waterUsage: Number,
  waterPrice: Number,
  otherCharges: { type: Number, default: 0 },
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  paidDate: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', invoiceSchema);