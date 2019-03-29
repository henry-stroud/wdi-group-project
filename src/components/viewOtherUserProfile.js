import React from 'react'
import axios from 'axios'

import {Redirect } from 'react-router-dom'


class ViewOtherUserProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      favGames: [],
      favGamesCovers: [],
      coverIds: [],
      redirect: false,
      mergedCoverandId: null,
      gameNames: []
    }

    this.handleClick = this.handleClick.bind(this)

  }


  componentDidMount() {
    this.setState({data: this.props.location.state.user}, () => {
      this.getProfile()
    })
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
        this.setState({mergedCoverandId: mergedAgain}, () => console.log(this.state))
      } else {
        return
      }
    }
  }


  getProfile() {
    const newArray = this.state.data.favouriteGames.map(item => item.gameId)
    console.log(newArray, 'THIS IS THE ARRAY')
    const otherArray = this.state.data.favouriteGames.map(item => item.name)
    const nameAndId = newArray.map(function (item, index) {
      return {gameId: item, name: otherArray[index]}
    })
    console.log(nameAndId)
    this.getAllGames()
    this.setState({favGames: nameAndId}, () => this.state.favGames.map(game => this.getCoverPhoto(game)))
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

  getCoverPhoto(game) {
    console.log(game.name)
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
    console.log(cover)
    axios.post('/api/games/onegame', {game: cover.name})
      .then(game => {
        this.setState({gameData: game.data[0]})
      })
      .then(() => console.log(this.state.gameData))
      .then(() => axios.post('/api/localgames', { gameId: cover.other.gameId}))
      .then((res) => this.setState({routedGame: res.data}, () => this.setState({redirect: !this.state.redirect})))
      .catch(err => console.log(err))
  }

  getUserComments() {
    axios.post('/api/localgames', { gameId: this.props.location.state.specificGame.gameId})
      .then((res) => this.setState({...this.state, gameComments: res.data.userComment}))
  }


  render(){
    {this.props.location.state.user && console.log(this.props.location.state.user, 'YA DONUT')}
    return(
      <main>
        {this.state.data &&
        <div className="contains-createProfile animated fadeIn">
          <div className="userDetails">
            <img className="avatar" src={this.state.data.avatar} />
            <h2 className="userName"> {this.state.data.username}</h2>
          </div>

          <div className="chooseGame">
            <h2> {`${this.state.data.username}'s top 6 games`}</h2>
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
            <h3>{`${this.state.data.username}'s comments`}</h3>
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


export default ViewOtherUserProfile
