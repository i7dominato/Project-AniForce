const express = require("express")
const cors = require("cors")
require("dotenv").config()

const routes = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/animes", require('./routes/animeRoutes'))
module.exports = app 
app.use('/api/users', require('./routes/userRoutes')) 