const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

const validate = require('../middlewares/validateMiddleware')
const { registerSchema, loginSchema } = require('../validations/userValidation')

router.post('/register', validate(registerSchema), userController.register)
router.post('/login', validate(loginSchema), userController.login)

module.exports = router

router.post('/refresh', userController.refresh)
