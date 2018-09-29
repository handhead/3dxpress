'use strict'

const express = require('express')
const router = express.Router()

const AuthApplication = require('./AuthApplication')

router.get('/status', (req, res) => {
    res.send({ status: 'OK' })
})

router.use('/auth', AuthApplication)

module.exports = router
