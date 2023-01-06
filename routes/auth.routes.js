const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const authController = require('../controller/auth.controller')
const authMiddaleware = require('../middleware/authMiddleware')

router.post(
  '/registration',
  [
    check('name', 'minimum length 6 characters').isLength({ min: 6 }),
    check('email', 'incorrect email').isEmail(),
    check('password', 'minimum length 6 characters').isLength({ min: 6 }),
  ],
  authController.registration,
)
router.post('/login', authController.login)
router.get('/check', authMiddaleware, authController.check)

module.exports = router
