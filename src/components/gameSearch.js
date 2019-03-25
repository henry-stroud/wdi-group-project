import React from 'react'
import axios from 'axios'
import Popup from '../components/popup'
import {withRouter} from 'react-router-dom'

class GameSearch extends React.Component {
  constructor(){
    super()

    this.state = {
      isOpen: false,
      data: {},
      errors: {},
      results: []
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

  render() {
    return(
      <div className="main-gameSearch">
        <div className="contains-gameSearch">
          <h2> Search a game and get involved! </h2>
          <input
            className="gameSearchBar"
            onChange={this.handleChange}
          />
          <button className="gameSearchButton"
            onClick={this.handleClick}> Go discover
          </button>

          <Popup
            show={this.state.isOpen}
            games={this.state.results}
            onClose={this.closePopup}>
          </Popup>
        </div>
      </div>
    )
  }
}

export default withRouter(GameSearch)
