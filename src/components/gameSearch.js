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
  }

  //ADD DATA FROM GAMES WE'RE PULLING HERE TO USE IN SELECT BOX
  componentDidMount() {
    axios.get('/api/games')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return(
      <div className="main-gameSearch">
        <div className="contains-gameSearch">
          <h2> Search a game and get involved! </h2>
          <Select
            className="gameSearchBar"
            games={this.state.games}
            //HANDE CHANGE HERE PLEASE
          />
          <button className="gameSearchButton"> Go discover </button>
        </div>
      </div>
    )
  }

}

export default GameSearch
