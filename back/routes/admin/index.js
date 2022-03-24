const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.post('/', controller.admin);

router.post('/user', controller.user);
router.post('/userModify', controller.userModify);

router.post('/category', controller.category);
router.post('/categoryAdd', controller.categoryAdd);
router.post('/categoryModify', controller.categoryModify);

router.post('/board', controller.board);
router.post('/boardModify', controller.boardModify);
router.post('/board/hide', controller.hide);
router.post('/board/idx', controller.idx);
router.post('/board/hit', controller.hit);
router.post('/board/good', controller.good);
router.post('/board/view/:idx', controller.view);

router.post('/stats', controller.stats);

module.exports = router;