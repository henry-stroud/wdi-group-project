import React from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'
import Select from 'react-select'

class GameSearch extends React.Component {
  constructor(){
    super()

    this.state = {
      data: {},
      errors: {},
      games: []
    }

    this.gameSearch = this.gameSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  //ADD DATA FROM GAMES WE'RE PULLING HERE TO USE IN SELECT BOX

  gameSearch() {
    axios.post('/api/games', this.state.query)
      .then(res => res.data.map(game => ({ value: game.id, label: game.name})))
      .then(games => this.setState({ games }))
      .catch(err => console.log(err))
  }


  handleChange({ target: { value } }) {
    this.setState({...this.state, query: value }, () => console.log(this.state))
    this.gameSearch()
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
          <button className="gameSearchButton"> Go discover </button>
        </div>
      </div>
    )
  }

}

export default GameSearch
