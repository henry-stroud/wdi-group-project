const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT || 4000
const dbURI = process.env.MONGO_URI || `mongodb://localhost/playerconnect-${env}`
const secret = process.env.SECRET || 'bhm'

module.exports = { env, dbURI, port, secret }
