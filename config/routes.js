require('dotenv').config()
const router = require('express').Router()
const auth = require('../controllers/auth')
const rp = require('request-promise')
const axios = require('axios')
const message = require('../controllers/messages')
const comments = require('../controllers/comments')
const secureRoute = require('../lib/secureRoute')

router.post('/register', auth.register)
router.post('/login', auth.login)

const ignApiKey = process.env.IGN_NEWS_KEY
const igdbApiKey = process.env.IGDB_USER_KEY

function getNews(req, res) {
  rp({
    url: `https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${ignApiKey}`,
    method: 'GET',
    qs: req.query,
    json: true
  })
    .then(news => res.json(news))
    .catch(err => res.json(err))
}

router.get('/news', getNews)

router.post('/games', (req, res) => {
  axios({
    url: 'https://api-v3.igdb.com/games',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': `${igdbApiKey}`,
      'Content-Type': 'text/plain'
    },
    data: `search "${req.body.game}"; fields *; exclude age_ratings,alternative_names,collection,external_games,franchise,franchises,game_engines,game_modes,keywords,multiplayer_modes,rating,rating_count,tags,websites,category;`

  })
    .then(games => {
      res.json(games.data)
    })
    .catch(err => console.error(err))
})

router.post('/game-videos', (req, res) => {
  axios({
    url: 'https://api-v3.igdb.com/game_videos',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': `${igdbApiKey}`,
      'Content-Type': 'text/plain'
    },
    data: 'fields *; where game = 27789;'

  })
    .then(videos => {
      res.json(videos.data)
    })
    .catch(err => console.error(err))
})

router.post('/game-covers', (req, res) => {
  console.log(req.body)
  axios({
    url: 'https://api-v3.igdb.com/covers',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': `${igdbApiKey}`,
      'Content-Type': 'text/plain'
    },
    data: `fields *; where game = ${req.body.game};`

  })
    .then(videos => {
      res.json(videos.data)
    })
    .catch(err => console.error(err))
})


//I DON'T KNOW WHAT IM DOING
// router.post('/accessgame', (req, res) => {
//   axios({
//     url: 'http://localhost:4000/',
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'user-key': `${igdbApiKey}`,
//       'Content-Type': 'text/plain'
//     }
//   })
//     .then(game => {
//       console.log(game)
//     })
//     .catch(err => console.log(err))
// })

router.route('/comments')
  .get(comments.index)
  .post(secureRoute, comments.create)

router.route('/messages')
  .get(message.index)
  .post(secureRoute, message.create)

router.route('/users')
  .get(secureRoute, auth.getProfile)
  .post(secureRoute, auth.addToProfile)

router.route('/allusers')
  .get(auth.getAllUsers)

router.route('/users/favouritegames')
  .post(secureRoute, auth.FavouriteGameCreateRoute)
  .delete(secureRoute, auth.FavouriteGameDeleteRoute)


module.exports = router
