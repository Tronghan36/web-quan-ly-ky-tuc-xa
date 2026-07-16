const express = require('express');
const router = express.Router();
const violationController = require('../controllers/violationController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', auth, violationController.getAll);
router.get('/:id', auth, violationController.getById);
router.post('/', auth, adminOnly, violationController.create);
router.put('/:id', auth, adminOnly, violationController.update);
router.delete('/:id', auth, adminOnly, violationController.delete);

module.exports = router;