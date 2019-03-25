const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  avatar: { type: String, required: true },
  favoriteGames: [{ type: String, requried: true}]
})

module.exports = mongoose.model('Profile', profileSchema)
