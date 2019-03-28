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
    .findOne({ username: req.body.username})
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

function addToProfile( req, res ) {
  req.body.user = req.currentUser
  User
    .findById(req.body.user._id)
    .then(user => {
      if (!user) return res.status(404).json({
        message: 'Not Found'})
      Object.assign(user, req.body)
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch((err) => res.json(err))
}

function getProfile( req, res ) {
  req.body.user = req.currentUser
  User
    .findOne({ _id: req.body.user._id})
    .populate('myComments myRatings')
    .then(user => {
      if (!user) return res.status(404).json({
        message: 'Not Found'})
      return user
    })
    .then(user => res.status(200).json(user))
    .catch((err) => res.json(err))
}

function getAllUsers( req, res ) {
  User
    .find()
    .populate('myComments myRatings')
    .then(users => {
      if (!users) return res.status(404).json({
        message: 'Not Found'})
      return users
    })
    .then(users => res.status(200).json(users))
    .catch((err) => res.json(err))
}

function FavouriteGameCreateRoute(req, res) {
  req.body.user = req.currentUser
  User
    .findById(req.body.user._id)
    .then(user => {
      user.favouriteGames.push(req.body)
      return user.save()
    })
    .then(user => res.json(user))
    .catch((err) => res.json(err))
}

function FavouriteGameDeleteRoute(req, res) {
  req.body.user = req.currentUser
  User
    .findById(req.body.user._id)
    .then(user => {
      const comment = user.favouriteGames.id(req.params.commentId)
      comment.remove()
      return user.save()
    })
    .then(cheese => res.json(cheese))
    .catch((err) => res.json(err))
}


module.exports = {
  register,
  login,
  addToProfile,
  getProfile,
  FavouriteGameDeleteRoute,
  FavouriteGameCreateRoute,
  getAllUsers
}
