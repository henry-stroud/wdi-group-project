import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Popup from '../components/popup'
import { BrowserRouter as Browser } from 'react-router-dom'


class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = { data: {
      isOpen: false,
      data: {},
      errors: {},
      results: [],
      avatar: '',
      favoriteGames: []
    }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.closePopup = this.closePopup.bind(this)

  }

  handleChange({ target: { value } }) {
    this.setState({...this.state, query: value })
  }

  handleClick(e) {
    e.preventDefault()
    axios.post('/api/games', {game: this.state.query})
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

  render(){
    return(
      <Browser>
        <main>
          <div className="contains-createProfile">
            <div className="userDetails">
              <img className="avatar" src="https://gaming-logo-maker.com/wp-content/uploads/2018/11/avatar-maker-minecraft-character-02-300x300.gif" />
              <h4 className="userName"> bubblesaurus90 </h4>
            </div>

            <div className="chooseGame">
              <h2> What are your top 6 games right now? </h2>
              <input
                className="chooseMyGames"
                onChange={this.handleChange}
              />
              <button className="gameSearchButton"
                onClick={this.handleClick}> Search
              </button>
              <Popup
                show={this.state.isOpen}
                games={this.state.results}
                onClose={this.closePopup}>
              </Popup>




              <div className="mygames">
                <div>  </div>
                <img  />
                <img  />
                <img  />
                <img  />
                <img  />
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
