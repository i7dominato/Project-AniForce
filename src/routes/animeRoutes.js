const express = require("express")
const router = express.Router()

const animeController = require("../controllers/animeController")

router.get('/', animeController.list)
router.post('/', animeController.create)
router.put('/:id', animeController.update)
router.delete('/:id', animeController.remove)

module.exports = router

const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware,animeController.create)
router.put('/:id', authMiddleware,animeController.update)
router.delete('/:id', authMiddleware,animeController.remove)