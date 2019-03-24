const Message = require('../models/message')


function indexRoute(req, res) {
  return Message
    .find()
    .populate('user')
    .then(messages => res.status(200).json(messages))
    .catch(err => res.json(err))
}

function createRoute(req, res) {
  req.body.user = req.currentUser
  return Message
    .create(req.body)
    .then(message => res.status(200).json(message))
    .catch(err => res.json(err))
}


module.exports = {
  index: indexRoute,
  create: createRoute
}
