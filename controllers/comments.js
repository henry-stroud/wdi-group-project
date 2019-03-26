const Comment = require('../models/game')


function indexRoute(req, res) {
  return Comment
    .find()
    .populate('user')
    .then(comments => res.status(200).json(comments))
    .catch(err => res.json(err))
}

function createRoute(req, res) {
  req.body.user = req.currentUser
  return Comment
    .create(req.body)
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json(err))
}


module.exports = {
  index: indexRoute,
  create: createRoute
}
