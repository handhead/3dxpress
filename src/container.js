'use strict'

const app = require('./infrastructure/express')
const mongoose = require('./infrastructure/mongoose')

// start app and connect to database
app.start()
mongoose.connect()

module.exports = app
