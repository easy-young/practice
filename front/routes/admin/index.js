const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.admin);
router.get('/user', controller.user);
router.get('/category', controller.category);
router.get('/board', controller.board);
router.get('/board/view/:idx', controller.view);
router.get('/stats', controller.stats);
router.post('/logout', controller.logout);

module.exports = router;