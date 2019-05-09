const Game = require('../models/game')

function getGame( req, res ) {
  console.log(req.body.gameId)
  Game
    .findOne({ gameId: req.body.gameId})
    .then(game => {
      if (!game) {
        req.body.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        return Game
          .create(req.body)
      }
      return game
    })
    .then(game => res.status(200).json(game))
    .catch((err) => res.json(err))
}

function getAllGames(req, res) {
  console.log(req.body)
  Game
    .find({gameId: req.body.gameId})
    .then(games => res.json(games))
    .catch((err) => res.json(err))
}

function gamesIndex(req, res) {
  console.log(req.body)
  Game
    .find()
    .then(games => res.json(games))
    .catch((err) => res.json(err))
}

function createComment(req, res) {
  console.log(req.body)
  req.body.user = req.currentUser
  console.log(req.body.user)
  Game
    .findOne({ gameId: req.body.gameId})
    .populate('user')
    .then(game => {
      game.userComment.push(req.body)
      return game.save()
    })
    .then(game => res.json(game))
    .catch((err) => res.json(err))
}

function createRating(req, res) {
  req.body.user = req.currentUser
  Game
    .findOne({ gameId: req.body.gameId})
    .then(game => {
      const ratingArray = [...game.userRating]
      const filteredArray = ratingArray.filter(rating => {
        return (rating.user._id.equals(req.body.user._id))
      })
      if (!filteredArray.length) {
        game.userRating.push(req.body)
        return game.save()
      } else {
        return game
      }
    })
    .then(game => res.json(game))
    .catch((err) => res.json(err))
}

module.exports = {
  getGame,
  createComment,
  createRating,
  getAllGames,
  gamesIndex
}
