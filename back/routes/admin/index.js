const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.post('/', controller.admin);
router.post('/user', controller.user);
router.post('/category', controller.category);
router.post('/board', controller.board);
router.post('/stats', controller.stats);

module.exports = router;