const Violation = require('../models/Violation');
const Joi = require('joi');

const schema = Joi.object({
  student: Joi.string().required(),
  room: Joi.string().required(),
  violationType: Joi.string().valid('Noise', 'Cleanliness', 'Unauthorized Guest', 'Alcohol/Drugs', 'Damage', 'Other').required(),
  description: Joi.string().required(),
  severity: Joi.string().valid('Minor', 'Major', 'Severe').required(),
  penalty: Joi.number(),
  status: Joi.string().valid('Open', 'Resolved')
});

exports.getAll = async (req, res) => {
  try {
    const violations = await Violation.find().populate(['student', 'room']);
    res.json(violations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const violation = await Violation.findById(req.params.id).populate(['student', 'room']);
    if (!violation) return res.status(404).json({ message: 'Violation not found' });
    res.json(violation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const violation = new Violation(value);
    await violation.save();
    res.status(201).json(violation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const violation = await Violation.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!violation) return res.status(404).json({ message: 'Violation not found' });
    res.json(violation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const violation = await Violation.findByIdAndDelete(req.params.id);
    if (!violation) return res.status(404).json({ message: 'Violation not found' });
    res.json({ message: 'Violation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};