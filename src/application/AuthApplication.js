'use strict'

const express = require('express')
const router = express.Router()
const validator = require('express-validation')
const httpStatus = require('http-status')

const UserService = require('../domain/user/UserService')
const UserValidation = require('../domain/user/UserValidation')

const auth = require('../infrastructure/policies/authorization')

router.route('/register')
  .post(
    validator(UserValidation.create),
    async (req, res, next) => {
      try {
        const user = await UserService.register(req.body)
        res.status(httpStatus.CREATED)
        res.json(user)
      } catch (error) {
        next(error)
      }
    })

router.route('/login')
  .post(
    validator(UserValidation.login),
    async (req, res, next) => {
      try {
        const result = await UserService.login(req.body)
        res.status(httpStatus.OK)
        res.json(result)
      } catch (error) {
        next(error)
      }
    })

// // Authentication example
router.route('/secret')
  .get(
    auth(),
    async (req, res, next) => {
      // example route for auth
      res.json({ message: 'Anyone can access(only authorized)' })
    })
// router.get('/secret2', auth(['admin']), (req, res) => {
//   // example route for auth
//   res.json({ message: 'Only admin can access' })
// })
// router.get('/secret3', auth(['user']), (req, res) => {
//   // example route for auth
//   res.json({ message: 'Only user can access' })
// })

module.exports = router
