const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()



router.get('/login', authController.loginPage)
router.post('/login', authController.login)
router.get('/sign-up', authController.signupPage)
router.post('/sign-up', authController.signup)
router.post('/logout', authController.logout)



module.exports = router;

