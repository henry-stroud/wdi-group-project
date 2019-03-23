import React from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'

class GameSearch extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      errors: {},
      games: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange({ target: { value } }) {
    this.setState({...this.state, query: value })
  }

  handleClick(e) {
    e.preventDefault()
    axios.post('/api/games', {game: this.state.query})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
        // res.data.map(game => ({ value: game.id, label: game.name})))
      // .then(games => this.setState({ games }))
      // .catch(err => console.log(err))
  }

  render() {
    const { games } = this.state
    return(
      <div className="main-gameSearch">
        <div className="contains-gameSearch">
          <h2> Search a game and get involved! </h2>
          <input
            className="gameSearchBar"
            onChange={this.handleChange}
            options={games}
          />
          <button className="gameSearchButton"
            onClick={this.handleClick}> Go discover </button>
        </div>
      </div>
    )
  }

}

export default GameSearch
