'use strict'

const User = require('./User')
const jwt = require('jsonwebtoken')
const config = require('../../infrastructure/config')

exports.register = async (params) => {
  try {
    const user = new User(params)
    const savedUser = await user.save()
    return savedUser.toObject()
  } catch (error) {
    return User.checkDuplicateEmailError(error)
  }
}

exports.login = async (params) => {
  try {
    const user = await User.findAndGenerateToken(params)
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.secret)
    return { message: 'OK', token }
  } catch (error) {
    return error
  }
}
