const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', auth, invoiceController.getAll);
router.get('/:id', auth, invoiceController.getById);
router.post('/', auth, adminOnly, invoiceController.create);
router.put('/:id', auth, adminOnly, invoiceController.update);
router.delete('/:id', auth, adminOnly, invoiceController.delete);

module.exports = router;