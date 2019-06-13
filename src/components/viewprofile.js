import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'

import {Redirect } from 'react-router-dom'


const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)

let arrayMerger = []

class ViewProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      favGames: [],
      favGamesCovers: [],
      redirect: false,
      coverIds: [],
      mergedCoverandId: null,
      gameNames: []
    }

    this.handleClick = this.handleClick.bind(this)

  }

  componentDidMount() {
    this.getProfile()
  }

  componentDidUpdate() {
    if (this.state.favGamesCovers.length >= 6) {
      // const mergedObject = this.state.coverIds.reduce((obj, k, i) => ({...obj, [k]: this.state.favGamesCovers[i] }), {})
      const gameCovers = [...this.state.favGamesCovers]
      const mergedObject = this.state.coverIds.map(function (gameId, index) {
        return {gameId: gameId, gameCovers: gameCovers[index]}
      })
      const mergedAgain = this.state.gameNames.map(function(name, i) {
        return {name: name, other: mergedObject[i]}
      })
      if (this.state.mergedCoverandId === null) {
        this.setState({mergedCoverandId: mergedAgain})
      } else {
        return
      }
    }
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
      .then(() => this.getArray(array))
      .then(() => this.setState({...this.state, favGames: arrayMerger}, this.getAllGames))
      .then(() => this.state.favGames.map(game => this.getCoverPhoto(game)))
  }

  getAllGames() {
    axios.get('api/localgames')
      .then((res) => {
        this.setState({ allGames: res.data }, this.mappingFunction)
      })
      .catch((err) => console.log(err))
  }

  getArray(array) {
    const newArray = array
    const otherArray = this.state.data.favouriteGames.map(item => item.name)
    const nameAndId = newArray.map(function (item, index) {
      return {gameId: item, name: otherArray[index]}
    })
    arrayMerger = nameAndId
  }



  mappingFunction() {
    const myComments = []
    if (this.state.data && this.state.data._id) {
      const user = this.state.data._id
      const allGames = this.state.allGames
      const filteredGames = allGames.filter(games => games.userComment.length)
      filteredGames.map(function(game) {
        game.userComment.map(function(item) {
          if (item.user._id === user) {
            myComments.push({game: game.name, comment: item, color: game.color, specificGame: game})
          }
        })
      })
      this.setState({myComments})
    }
  }

  // getGameInfoFromId(id) {
  //   axios.get()
  // }

  getCoverPhoto(game) {
    axios.post('api/game-covers', { game: game.gameId})
      .then(cover => {
        if (cover.data && cover.data.length) {
          this.setState({...this.state, cover: `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.data[0].image_id}.jpg`, coverId: cover.data[0].game}, () => this.setState(prevState => ({
            favGamesCovers: [...prevState.favGamesCovers, this.state.cover],
            coverIds: [...prevState.coverIds, this.state.coverId],
            gameNames: [...prevState.gameNames, game.name]
          })))
        } else return
      })
      .catch(err => console.log(err))
  }

  handleClick() {
    this.addUserImage()
  }

  handleClickGame(game) {
    axios.post('/api/games/onegame', {game: game.name})
      .then(game => {
        this.setState({gameData: game.data[0]})
      })
      .then(() => this.setState({routedGame: game}, () => this.setState({redirect: !this.state.redirect})))
      .catch(err => console.log(err))
  }



  handleClickGameCover(cover) {
    axios.post('/api/games/onegame', {game: cover.name})
      .then(game => {
        this.setState({gameData: game.data[0]})
      })
      .then(() => axios.post('/api/localgames', { gameId: cover.other.gameId, name: cover.name}))
      .then((res) => this.setState({routedGame: res.data}, () => this.setState({redirect: !this.state.redirect})))
      .catch(err => console.log(err))
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
            <h3 className="userName"> Welcome back, </h3>
            <h2> {this.state.data.username}</h2>
          </div>

          <div className="chooseGame">
            <h2> My top 6 games </h2>
            <div className="mygames">
              {this.state.mergedCoverandId && this.state.mergedCoverandId.map((cover, index) =>
                <div className="eachGame" key={index}>
                  <img id="gameClicker" onClick={() => this.handleClickGameCover(cover)} src={cover.other.gameCovers} alt="gamecover"/>
                  {this.state.redirect && <Redirect
                    to={{
                      pathname: '/gameforum',
                      state: {
                        game: this.state.gameData,
                        specificGame: this.state.routedGame
                      }
                    }}></Redirect>}
                </div>
              )}
            </div>
          </div>

          <div className="comments-complete">
            <h3> Your comments...</h3>
            <div className="comments">
              {(this.state.myComments && this.state.myComments.length !== 0) && this.state.myComments.map((comment, i) =>
                <div className ="messages" key={i}>
                  <small><span id="gameClicker" onClick={() => this.handleClickGame(comment.specificGame)} style={{color: `${comment.color}`}}>{this.state.redirect && <Redirect
                    to={{
                      pathname: '/gameforum',
                      state: {
                        game: this.state.gameData,
                        specificGame: this.state.routedGame
                      }
                    }}></Redirect>}{comment.game}</span><span style={{color: 'white'}}> :</span> <span>{comment.comment.text}</span> </small>
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
