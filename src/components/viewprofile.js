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
      .then(() => this.setState({...this.state, favGames: array}, this.getAllGames))
      .then(() => this.state.favGames.map(gameId => this.getCoverPhoto(gameId)))
  }

  getAllGames() {
    axios.get('api/localgames')
      .then((res) => {
        this.setState({ allGames: res.data }, this.mappingFunction)
      })
      .catch((err) => console.log(err))
  }


  mappingFunction() {
    const myComments = []
    if (this.state.data && this.state.data._id) {
      const user = this.state.data._id
      const allGames = this.state.allGames
      const filteredGames = allGames.filter(games => games.userComment.length)
      console.log('filteredGames', filteredGames)
      filteredGames.map(function(game) {
        game.userComment.map(function(item) {
          if (item.user._id === user) {
            console.log(game, 'this is the game',item, 'thisis the item')
            myComments.push({game: game.name, comment: item, color: game.color})
          }
        })
      })
      this.setState({myComments}, () => console.log(this.state.myComments, 'BANANAS'))
    }
  }

  // getGameInfoFromId(id) {
  //   axios.get()
  // }

  getCoverPhoto(gameId) {
    axios.post('api/game-covers', { game: gameId})
      .then(cover => {
        if (cover.data && cover.data.length) {
          this.setState({...this.state, cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.data[0].image_id}.jpg`}, () => this.setState(prevState => ({
            favGamesCovers: [...prevState.favGamesCovers, this.state.cover]
          })))
        } else return
      })
      .catch(err => console.log(err))
  }

  handleClick() {
    this.addUserImage()
  }

  render(){
    return(
      <main>
        {this.state.data &&
        <div className="contains-createProfile animated fadeIn">
          <div className="userDetails">
            <img className="avatar" src={this.state.data.avatar} />
            <button
              onClick={this.handleClick}>
                Change photo
            </button>
            <h3 className="userName"> Welcome back,<h2> {this.state.data.username}</h2> </h3>
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
            <h3> Your comments...</h3>
            <div className="comments">
              {(this.state.myComments && this.state.myComments.length !== 0) && this.state.myComments.map((comment, i) =>
                <div className ="messages" key={i}>
                  <small><span style={{color: `${comment.color}`}}>{comment.game}</span><span style={{color: 'white'}}> :</span> <span>{comment.comment.text}</span> </small>
                </div>
              )}
            </div>

          </div>
        </div>
        }
      </main>
    )
  }
}


export default ViewProfile
