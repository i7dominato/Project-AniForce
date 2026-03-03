const express = require("express")
const router = express.Router()

const animeRoutes = require("./animeRoutes")

router.use("/animes", animeRoutes)

module.exports = router