const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { auth, adminOnly } = require('../middleware/auth');

router.get('/', auth, roomController.getAll);
router.get('/:id', auth, roomController.getById);
router.post('/', auth, adminOnly, roomController.create);
router.put('/:id', auth, adminOnly, roomController.update);
router.delete('/:id', auth, adminOnly, roomController.delete);

module.exports = router;