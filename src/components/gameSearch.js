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
      .then(result => {
        console.log(result)

      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  handleChange() {
    console.log('hello')
    this.setState({ query: this.search.value })
  }

  render() {
    return(
      <div className="main-gameSearch">
        <div className="contains-gameSearch">
          <h2> Search a game and get involved! </h2>
          <Select
            className="gameSearchBar"
            games={this.state.games}
            onChange={this.handleChange}
          />
          <button className="gameSearchButton"> Go discover </button>
        </div>
      </div>
    )
  }

}

export default GameSearch
