const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', auth, studentController.getAll);
router.get('/:id', auth, studentController.getById);
router.post('/', auth, adminOnly, studentController.create);
router.put('/:id', auth, adminOnly, studentController.update);
router.delete('/:id', auth, adminOnly, studentController.delete);

module.exports = router;