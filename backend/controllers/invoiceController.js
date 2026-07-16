const Invoice = require('../models/Invoice');
const Joi = require('joi');

const schema = Joi.object({
  invoiceNumber: Joi.string().required(),
  student: Joi.string().required(),
  room: Joi.string().required(),
  month: Joi.date().required(),
  roomPrice: Joi.number(),
  electricityUsage: Joi.number(),
  electricityPrice: Joi.number(),
  waterUsage: Joi.number(),
  waterPrice: Joi.number(),
  otherCharges: Joi.number(),
  totalAmount: Joi.number(),
  status: Joi.string().valid('Pending', 'Paid', 'Overdue'),
  notes: Joi.string()
});

exports.getAll = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate(['student', 'room']);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(['student', 'room']);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const invoice = new Invoice(value);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};