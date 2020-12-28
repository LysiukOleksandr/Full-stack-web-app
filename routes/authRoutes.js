const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/verify', authController.verifyPassword)
router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.changePassword)
module.exports = router