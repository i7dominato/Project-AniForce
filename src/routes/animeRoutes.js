const express = require("express")
const router = express.Router()

const animeController = require("../controllers/animeController")
const authMiddleware = require('../middlewares/authMiddleware')
const validate = require('../middlewares/validateMiddleware')
const { animeSchema }= require('../validations/animeValidation')

router.get('/', animeController.list)
router.post('/', authMiddleware, validate(animeSchema), animeController.create)
router.put('/:id', authMiddleware,animeController.update)
router.delete('/:id', authMiddleware,animeController.remove)

module.exports = router
