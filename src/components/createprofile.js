import React from 'react'
import axios from 'axios'

import PopupProfilePage from '../components/popupProfilePage'

import Auth from '../lib/auth'


const fileStackKey = process.env.REACT_APP_FILE_STACK_API

import * as filestack from 'filestack-js'
const client = filestack.init(fileStackKey)
console.log(fileStackKey)
console.log(client)

class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = { data: {
      isOpen: false,
      data: {},
      errors: {},
      results: [],
      avatar: ''
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
    console.log(this.state)
    axios.post('api/users', avatarLink, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res) => this.setState(res.data))
      .then(console.log(this.state))
  }

  handleChange({ target: { value } }) {
    this.setState({...this.state, query: value })
  }

  handleClickButton(e) {
    e.preventDefault()
    axios.post('/api/games', { game: this.state.query})
      .then(games => {
        console.log(games.data)
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
      .then(res => console.log(res))
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleClick() {
    this.addUserImage()
  }

  handleClickGames(item) {
    this.setState({...this.state, gameId: item.id }, () => axios.post('api/users/favouritegames', this.state, { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((res) => this.setState({...this.state, newdata: res.data }))
      .then(console.log(this.state)))

  }

  render(){
    {this.state && console.log(this.state)}
    return(
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
            <input
              className="chooseMyGames"
              onChange={this.handleChange}
            />
            <button className="gameSearchButton"
              onClick={this.handleClickButton}> Search
            </button>
            <PopupProfilePage
              show={this.state.isOpen}
              games={this.state.results}
              handleClickGames={this.handleClickGames}
              onClose={this.closePopup}>
            </PopupProfilePage>
            <div className="mygames">
              <div>My Game 1</div>
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
    )
  }
}


export default CreateProfile
