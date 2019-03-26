import React from 'react'
import axios from 'axios'

import Auth from '../lib/auth'

const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)
console.log(fileStackKey)
console.log(client)


class ViewProfile extends React.Component{
  constructor(){
    super()

    this.state = {data: {
      username: '',
      avatar: '',
      favoriteGames: [],
      errors: {}
    }}
    this.handleClick = this.handleClick.bind(this)

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
    console.log(this.state)
    axios.post('api/users', avatarLink, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res) => this.setState(res.data))
      .then(console.log(this.state))
  }

  getProfile() {
    axios.get('api/users', { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((user) => this.setState({...this.state, data: user.data}))
  }

  componentDidMount() {
    this.getProfile()
  }

  handleClick() {
    this.addUserImage()
  }

  render(){
    return(
      <main>
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
              <div> {this.state.data.favoriteGames[0]} </div>
              <div> {this.state.data.favoriteGames[1]} </div>
              <div> {this.state.data.favoriteGames[2]} </div>
              <div> {this.state.data.favoriteGames[3]} </div>
              <div> {this.state.data.favoriteGames[4]} </div>
              <div> {this.state.data.favoriteGames[5]} </div>
            </div>
          </div>

          <div className="comments-complete">
            <h3> Your comments will appear here on you profile.</h3>
            <div className="comments"> </div>
            <button className="completeProfile">Complete profile!</button>
          </div>
        </div>
      </main>
    )
  }
}


export default ViewProfile
