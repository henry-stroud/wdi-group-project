const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  message: {type: String, required: true},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

messageSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Message', messageSchema)
