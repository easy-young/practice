const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.post('/join',controller.join);
router.post('/welcome',controller.welcome);
router.post('/login',controller.login);
router.post('/logout',controller.logout);
router.post('/profile',controller.profile);
router.post('/profileUpdate',controller.profileUpdate);
router.post('/resign',controller.resign);
router.post('/auth',controller.Auth);


module.exports = router