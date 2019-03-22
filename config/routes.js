require('dotenv').config()
const router = require('express').Router()
const auth = require('../controllers/auth')
const rp = require('request-promise')
const axios = require('axios')
const bodyParser = require('body-parser')


router.use(bodyParser.json())

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
  console.log(req.body)
  axios({
    url: 'https://api-v3.igdb.com/games',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': `${igdbApiKey}`,
      'Content-Type': 'text/plain'
    },
    data: `search "${req.body}"; fields name,artworks,videos;`
  })
    .then(games => res.json(games.data))
    .catch(err => console.error(err))
})

module.exports = router
