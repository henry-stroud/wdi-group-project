const Game = require('../models/game')

function getGame( req, res ) {
  console.log(req.body.gameId)
  Game
    .findOne({ gameId: req.body.gameId})
    .populate('commentSchema')
    .then(game => {
      if (!game) {
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
    .populate('userComment')
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
  console.log(req.body)
  req.body.user = req.currentUser
  Game
    .findOne({ gameId: req.body.gameId})
    .then(game => {
      game.userRating.push(req.body)
      return game.save()
    })
    .then(game => res.json(game))
    .catch((err) => res.json(err))
}

module.exports = {
  getGame,
  createComment,
  createRating,
  getAllGames
}
