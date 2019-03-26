import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'

const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)


class ViewProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      favGames: [],
      favGamesCovers: []
    }

    this.handleClick = this.handleClick.bind(this)

  }

  componentDidMount() {
    this.getProfile()
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

  getProfile() {
    const array = []
    axios.get('api/users', { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((user) => this.setState({...this.state, data: user.data}, () => this.state.data.favouriteGames.map(item => array.push(item.gameId))))
      .then(() => this.setState({...this.state, favGames: array}, () => console.log(this.state)))
      .then(() => this.state.favGames.map(gameId => this.getCoverPhoto(gameId)))
  }

  getCoverPhoto(gameId) {
    axios.post('api/game-covers', { game: gameId})
      .then(cover => {
        this.setState({...this.state, cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.data[0].image_id}.jpg`}, () => this.setState(prevState => ({
          favGamesCovers: [...prevState.favGamesCovers, this.state.cover]
        })))
      })
      .catch(err => console.log(err))
  }

  handleClick() {
    this.addUserImage()
  }

  render(){
    {this.state && console.log(this.state)}
    return(
      <main>
        {this.state.data &&
        <div className="contains-createProfile animated zoomIn">
          <div className="userDetails">
            <img className="avatar" src={this.state.data.avatar} />
            <button
              onClick={this.handleClick}>
                Change photo
            </button>
            <h2 className="userName"> Welcome back, {this.state.data.username}. </h2>
          </div>

          <div className="chooseGame">
            <h2> My top 6 games </h2>
            <div className="mygames">
              {this.state.favGamesCovers && this.state.favGamesCovers.map((cover, index) =>
                <div className="eachGame" key={index}>
                  <img src={cover} alt="gamecover"/>
                </div>
              )}
            </div>
          </div>

          <div className="comments-complete">
            <h3> Your comments will appear here on you profile.</h3>
            <div className="comments"> </div>
            <button className="completeProfile">Complete profile!</button>
          </div>
        </div>
        }
      </main>
    )
  }
}


export default ViewProfile
