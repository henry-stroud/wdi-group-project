const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')

mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true }, (err, db) => {
  db.dropDatabase()
    .then(() =>
      User.create([
        {
          username: 'bhm',
          email: 'bhm@email.com',
          password: 'pass',
          passwordConfirmation: 'pass',
          color: '#' + (Math.random()*0xFFFFFF<<0).toString(16)

        }
      ])
        .then(users => console.log(`${users.length} users created`))
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close()))
})
