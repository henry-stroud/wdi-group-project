import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { BrowserRouter as Browser } from 'react-router-dom'

import Auth from '../lib/auth'


const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)
console.log(fileStackKey)
console.log(client)

class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = {
      avatar: '',
      favoriteGames: []
    }

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


  // addUserImage() {
  //   const options = {
  //     'displayMode': 'inline',
  //     'container': '.mygames',
  //     'maxFiles': 4,
  //     'accept': [
  //       'image/jpeg',
  //       'image/jpg',
  //       'image/png',
  //       'image/bmp',
  //       'image/gif',
  //       'application/pdf'
  //     ],
  //     'storeTo': {
  //       'container': 'devportal-customers-assets',
  //       'path': 'user-uploads/',
  //       'region': 'us-east-1'
  //     },
  //     'fromSources': [
  //       'local_file_system'
  //     ],
  //     'uploadInBackground': false
  //   }
  //
  //   const picker = client.picker(options)
  //   picker.open()
  // }


  handleSubmit (e) {
    e.preventDefault()
    axios.post('api/register', this.state.data)
      .then(res => console.log(res))
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleClick() {
    this.addUserImage()
  }

  render(){
    {this.state && console.log(this.state)}
    return(
      <Browser>
        <main>
          <div className="contains-createProfile">
            <div className="userDetails">
              <img className="avatar" src={this.state.avatar} />
              <h4 className="userName"> bubblesaurus90 </h4>
              <button
                onClick={this.handleClick}>
                Upload photo
              </button>
            </div>

            <div className="chooseGame">
              <h2> What are your top 6 games right now? </h2>
              <Select
                className="chooseMyGames"
                // options={this.state.games}
              />
              <div className="mygames">
                <div> My Game 1 </div>
                <div> My Game 2 </div>
                <div> My Game 3 </div>
                <div> My Game 4 </div>
                <div> My Game 5 </div>
                <div> My Game 6 </div>
              </div>
            </div>

            <div className="comments-complete">
              <h3> Your comments will appear here on you profile.</h3>
              <div className="comments"> </div>
              <button className="completeProfile">Complete profile!</button>
            </div>
          </div>
        </main>
      </Browser>
    )
  }
}


export default CreateProfile
