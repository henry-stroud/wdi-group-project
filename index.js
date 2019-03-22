const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const router = require('./config/routes')
const errorHandler = require('./lib/errorHandler')
const app = express()


mongoose.connect(dbURI, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

app.use(express.static(`${__dirname}`))

app.use(bodyParser.json())

app.use('/api', router)

app.use(errorHandler)

const server = app.listen(port, () => console.log(`App is listening on port ${port}`))

const socket = require('socket.io')
const io = socket(server)

io.on('connection', (socket) => {
  console.log(`socket is running, socket id: ${socket.id}`)

  socket.on('sendMessage', function(data) {
    io.emit('receiveMessage', data)
  })
})
