const express = require("express")
const router = express.Router()

const animeController = require("../controllers/animeController")

router.get('/', animeController.list)
router.post('/', animeController.create)
router.put('/:id', animeController.update)

module.exports = router