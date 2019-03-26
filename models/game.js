const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  gameId: { type: String },
  name: { type: String },
  rating: { type: Number },
  cover: { type: String },
  firstReleaseDate: { type: Number },
  screenshots: [],
  summary: { type: String },
  userRating: [ userRatingSchema ],
  userComment: [ commentSchema ]
})

const userRatingSchema = new mongoose.Schema({
  userId: { type: String },
  userRating: { type: Number, min: 0, max: 100}
})

const commentSchema = new mongoose.Schema({
  userId: { type: String },
  userComment: { type: String },
  createdAt: { type: Date, default: Date.now }

})

gameSchema.virtual('avgRating')
  .get(function() {
    return Math.round(this.userRating.reduce((acc, cv) => {
      return acc + cv
    }, 0) / this.userRating.length)
  })

gameSchema.set('toJSON', { virtuals: true })


module.exports = mongoose.model('Game', gameSchema)
