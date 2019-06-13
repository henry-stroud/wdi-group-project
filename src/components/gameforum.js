import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Browser } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import StarRatings from 'react-star-ratings'

import Auth from '../lib/auth'

import { Redirect } from 'react-router-dom'

class GameForum extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        liveComment: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }

  getCoverPhoto() {
    axios.post('api/game-covers', {game: this.state.game.id})
      .then(games => {
        this.setState({...this.state, results: games.data})
      })
      .catch(err => console.log(err))
  }

  getGenres() {
    if (this.state.game.genres) {
      const newGenres = `(${[...this.state.game.genres].toString()})`
      axios.post('api/game-genres', {genreId: newGenres})
        .then(genres => {
          this.setState({...this.state, genres: genres.data})
        })
        .catch(err => console.log(err))
    } else
      return
  }

  getScreenshots() {
    if (this.state.game.screenshots) {
      const newScreenshots = `(${[...this.state.game.screenshots].toString()})`
      axios.post('api/game-screenshots', { screenshotsId: newScreenshots})
        .then(screenshots => {
          this.setState({...this.state, screenshots: screenshots.data})
        })
        .catch(err => console.log(err))
    } else
      return
  }

  getUserComments() {
    axios.post('/api/localgames', { gameId: this.props.location.state.specificGame.gameId})
      .then((res) => this.setState({...this.state, gameComments: res.data.userComment}))
  }

  componentDidMount() {
    this.setState({...this.state, game: this.props.location.state.game}, () => {
      this.userAggregateRating()
      this.getCoverPhoto()
      this.getGenres()
      this.getScreenshots()
      this.getUserComments()
    })
  }

  userAggregateRating() {
    const ratings = this.props.location.state.specificGame.userRating
    if (ratings.length) {
      const mappedRatings = ratings.map(rating => rating.userRating)
      const sum = mappedRatings.reduce((previous, current) => current += previous)
      const avg = sum / mappedRatings.length
      this.setState({rating: avg})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('api/localgames/comments', {text: this.state.data.liveComment, gameId: this.props.location.state.specificGame.gameId}, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res)=> this.setState({...this.state, comments: res.data, data: { liveComment: ''}}))
      .then(() => this.getUserComments())
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  changeRating( newRating ) {
    this.setState({...this.state, rating: newRating}, this.pushUserRating )
  }


  pushUserRating() {
    axios.post('api/localgames/ratings', { userRating: this.state.rating, gameId: this.props.location.state.specificGame.gameId }, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .catch((err) => console.log(err))
  }

  goToUserProfile(comment) {
    this.setState({user: comment.user}, () => this.setState({redirect: !this.state.redirect}))
  }

  render() {
    const game = this.props.location.state.game
    const releaseDate = new Date(this.props.location.state.game.first_release_date * 1000)
    const rating = this.props.location.state.game.aggregated_rating
    return(
      <main>
        <div className="contains-gameForum">
          <div className="forumSplit">
            <div className="gameForum-left">
              <div className="contains-gameInfo">
                <div className="gameCover">
                  <img src= {(this.state.results && this.state.results.length)  ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${this.state.results[0].image_id}.jpg` : '' } alt="no game cover" />
                </div>
                <div className="gameDetails">
                  <h2>{game.name && game.name}</h2>
                  <h5>Released: &nbsp;
                    {releaseDate && releaseDate.getDate().toString()}/
                    {releaseDate && (releaseDate.getMonth() + 1).toString()}/
                    {releaseDate && releaseDate.getFullYear().toString()}
                  </h5>
                  <span>
                    {(this.state.genres && this.state.genres.length) && this.state.genres.map((genre, index) => <small key={index}>{genre.name}   </small>)}
                  </span>
                  <p>{game.summary && game.summary}</p>
                </div>
              </div>

              <div className="contains-ratings">
                <div className="rateGame">
                  what you think
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="gold"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="30px"
                    starSpacing="10px"
                  />
                  <div className="criticRating">
                  what we think
                    <StarRatings
                      rating={rating && rating.toFixed(1)/20}
                      starRatedColor="darkblue"
                      starDimension="40px"
                      starSpacing="15px"
                      starDimension="30px"
                      starSpacing="10px"
                    />
                  </div>
                </div>
              </div>
            </div>


            {Auth.isAuthenticated() &&
            <div className="gameForum-right">
              <form onSubmit={this.handleSubmit} className="addcomment">
                <textarea
                  name="liveComment"
                  onChange={this.handleChange}
                  value={this.state.data.liveComment || ''}
                  placeholder="what do you think?..."
                />
                <button> Post comment </button>
              </form>

              <div className="commentsfeed">
                <div className = "chatBox">
                  {this.state.gameComments && this.state.gameComments.map((comment, i) =>
                    <div className ="messages" key={i}>
                      <small><span id='userClicker' onClick={() => this.goToUserProfile(comment)} style={{color: `${comment.user.color}`}}>{comment.user.username}{this.state.redirect && <Redirect
                        to={{
                          pathname: '/viewotherprofile',
                          state: {
                            user: this.state.user
                          }
                        }}></Redirect>}</span>: <span>{comment.text}</span> </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            }
            {!Auth.isAuthenticated() &&
              <div className="overlay">
                <div className="locked">
                  <i className="fas fa-lock lock"></i>
                </div>
                <form onSubmit={this.handleSubmit} className="addcomment">
                  <input disabled
                    placeholder="comment on this game..."
                  />
                  <button> Post comment </button>
                </form>
                <div className="commentsfeed">
                  <div className = "chatBox">

                  </div>
                </div>
              </div>
            }
          </div>
          <div className="contains-screenshots">
            <div>
              {(this.state.screenshots && this.state.screenshots.length) && this.state.screenshots.map((screenshots, index) => <p key={index}><img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshots.image_id}.jpg`}/></p>)}
            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default withRouter(GameForum)
