import React from 'react'
// import ReactDOM from 'react-dom'
// import { BrowserRouter as Browser } from 'react-router-dom'
// import axios from 'axios'
import {withRouter} from 'react-router-dom'


class GameForum extends React.Component {
  constructor(){
    super()

    console.log(this.props)
    this.state = {}
  }

  componentDidMount () {
    console.log(this.props.location.state)
  }

  render(){
    return(
      <main>
        <div className="contains-gameForum">
          <div className="gameForum-left">
            <div className="contains-gameInfo">
              <div className="gameCover">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg/220px-Halo_-_Combat_Evolved_%28XBox_version_-_box_art%29.jpg" alt="" />
              </div>
              <div className="gameDetails">
                <h2>
                  {this.props.location.state}
                  {this.state.name}
                  hi
                </h2>
                <h5>12th November 2004</h5>
                <h5>Action / Sci Fi / FPS</h5>
                <p> Master chief is a badass motherfucker and he does all kinda cool shit untill the flood comes along and fucks up everybody.</p>
              </div>
            </div>
            <div className="contains-ratings">
              <div className="ourRating">
                <h1>4.3</h1>
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
