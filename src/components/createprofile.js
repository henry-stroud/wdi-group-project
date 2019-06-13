import React from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'


import PopupProfilePage from '../components/popupProfilePage'

import Auth from '../lib/auth'

const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)


class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      favGames: [],
      data: {
        isOpen: false,
        data: {},
        errors: {},
        results: [],
        avatar: '',
        cover: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleClickGames = this.handleClickGames.bind(this)

  }


  addUserImage() {
    const options = {
      accept: ['image/*'],
      onFileUploadFinished: file => {
        this.setState({...this.state, avatar: file.url}, () => this.pushAvatarToBackEnd(this.state))
      }
    }
    client.picker(options).open()
  }

  pushAvatarToBackEnd (avatarLink) {
    axios.post('api/users', avatarLink, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res) => this.setState(res.data))
  }

  handleChange({ target: { value } }) {
    this.setState({...this.state, query: value })
  }

  handleClickButton(e) {
    e.preventDefault()
    axios.post('/api/games', { game: this.state.query})
      .then(games => {
        this.setState({results: games.data})
        this.openPopup()
      })
      .catch(err => console.log(err))
  }

  openPopup (){
    this.setState({
      isOpen: true
    })
  }

  closePopup () {
    this.setState({
      isOpen: false
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    axios.post('api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleClick() {
    this.addUserImage()
  }

  handleClickGames(item) {
    this.setState({...this.state, gameId: item.id, name: item.name }, () => axios.post('api/users/favouritegames', this.state, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res) => this.setState({...this.state, newdata: res.data }, () => this.getCoverPhoto())))
  }


  getCoverPhoto() {
    axios.post('api/game-covers', { game: this.state.gameId})
      .then(cover => {
        this.setState({...this.state, cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.data[0].image_id}.jpg`}, () => this.setState(prevState => ({
          favGames: [...prevState.favGames, this.state.cover]
        })))
      })
      .catch(err => console.log(err))
  }


  render(){
    return(
      <main>
        <div className="contains-createProfile">
          <div className="userDetails">
            <img className="avatar" src={this.state.avatar} />
            <h4 className="userName"> </h4>
            <button
              onClick={this.handleClick}>
                Upload photo
            </button>
          </div>

          <div className="chooseGame">
            <h2> What are your top 6 games right now? </h2>
            {this.state.favGames.length < 6 && <input
              className="chooseMyGames"
              onChange={this.handleChange}
            />}
            {this.state.favGames.length < 6 && <button className="gameSearchButton"
              onClick={this.handleClickButton}> Search
            </button>}
            {this.state.favGames.length < 6 && <PopupProfilePage
              show={this.state.isOpen}
              favGames={this.state.favGames}
              games={this.state.results}
              handleClickGames={this.handleClickGames}
              onClose={this.closePopup}>
            </PopupProfilePage>
            }
            <div className="mygames">
              {this.state.favGames && this.state.favGames.map((cover, index) =>
                <div className="eachGame" key={index}>
                  <img src={cover} alt="gamecover"/>
                </div>
              )}
            </div>
          </div>
          <div className="comments-complete">
            <h3> Your comments will appear here on you profile.</h3>
            <div className="comments"> </div>
            {(this.state.favGames.length >= 6 && this.state.avatar) && <Link to="/"><button className="completeProfile">Complete profile!</button></Link>}
          </div>
        </div>
      </main>
    )
  }
}


export default withRouter(CreateProfile)
