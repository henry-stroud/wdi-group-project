/* global describe it api expect beforeEach afterEach*/

require('../spec_helper')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const { secret } = require('../../config/environment')

let token
describe('message tests', () => {

  beforeEach(done => {
    User.collection.remove()
    User.create({
      username: 'test',
      email: 'test',
      password: 'test',
      passwordConfirmation: 'test'
    })

      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.collection.remove()
    done()
  })

  describe('GET /messages', () => {
    it('should return a 200 response', (done) => {
      api
        .get('/api/messages')
        .end((req, res) => {
          expect(res.status).to.eq(200)
          done()
        })
    })
  })

  describe('GET /messages', () => {
    it('should return an array', done => {
      api
        .get('/api/messages')

        .end((req, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })

  describe('POST /messages', () => {

    it('should return a 200 response', done => {
      console.log(token)
      api
        .post('/api/messages')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          expect(res.status).to.eq(200)
          done()
        })
    })
    it('should return an array', done => {
      api
        .get('/api/messages')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
})
