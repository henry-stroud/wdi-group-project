import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Browser } from 'react-router-dom'
// import axios from 'axios'
import {withRouter} from 'react-router-dom'


class GameForum extends React.Component {
  constructor(){
    super()

    this.state = {}
  }

  render(){
    const game = this.props.location.state.game
    return(
      <main>
        <div className="contains-gameForum">
          <div className="gameForum-left">
            <div className="contains-gameInfo">
              <div className="gameCover">
                <img src= {game.cover} alt="game cover" />
              </div>
              <div className="gameDetails">
                <h2>{game.name}</h2>
                <h5>Released: {game.first_release_date}</h5>
                <h5>{game.genres}</h5>
                <p> {game.summary}</p>
              </div>
            </div>
            <div className="contains-ratings">
              <div className="ourRating">
                <h1>{game.rating}</h1>
              </div>
              <div className="yourRating">
                <h1>4.7</h1>
              </div>
              <select className="rateGame">
                <option> 1 </option>
                <option> 2 </option>
                <option> 3 </option>
                <option> 4 </option>
                <option> 5 </option>
              </select>
            </div>
            <div className="contains-screenshots">
              {game.screenshots}
            </div>
          </div>
          <div className="gameForum-right">
            <form className="addcomment">
              <input
                placeholder="what do you think?..."
              />
              <button> Post comment </button>
            </form>
            <div className="commentsfeed">
            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default withRouter(GameForum)
