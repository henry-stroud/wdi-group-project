const User = require('../models/user')

const jwt = require('jsonwebtoken')

const { secret } = require('../config/environment')

function register(req, res) {
  req.body.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
  User
    .create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.json({
        message: `Thanks for registering ${user.username}`,
        token,
        user
      })
    })
    .catch(err => res.status(422).json(err))
}

function login (req, res) {
  User
    .findOne({ email: req.body.email})
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized'})
      }
      const token = jwt.sign({ sub: user._id}, secret, { expiresIn: '6h'})
      res.json({
        message: `thanks for logging in ${user.username}`,
        token,
        user
      })
    })
    .catch(err => res.status(422).json(err))
}

function addAvatar( req, res ) {
  req.body.user = req.currentUser
  User
    .findById(req.body.user._id)
    .then(user => {
      if (!user) return res.status(404).json({
        message: 'Not Found'})
      Object.assign(user, req.body)
      return user.save()
    })
    .then(movie => res.status(200).json(movie))
    .catch((err) => res.json(err))
}

module.exports = {
  register,
  login,
  addAvatar
}
