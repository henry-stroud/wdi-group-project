const mongoose = require('mongoose')

const userRatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', autopopulate: true },
  userRating: { type: Number, min: 0, max: 100}
})


const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', autopopulate: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const gameSchema = new mongoose.Schema({
  gameId: { type: Number },
  name: {type: String },
  color: {type: String},
  userRating: [ userRatingSchema ],
  userComment: [ commentSchema ]
})


gameSchema.virtual('avgRating')
  .get(function() {
    return Math.round(this.userRating.reduce((acc, cv) => {
      return acc + cv
    }, 0) / this.userRating.length)
  })

gameSchema.set('toJSON', { virtuals: true })

commentSchema.plugin(require('mongoose-autopopulate'))
userRatingSchema.plugin(require('mongoose-autopopulate'))
gameSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Game', gameSchema)
