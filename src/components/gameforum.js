import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser } from 'react-router-dom'
import axios from 'axios'


class GameForum extends React.Component {
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return(
      <Browser>
        <main>
          <div className="contains-gameForum">
            <div className="gameForum-left">
              <div className="contains-gameInfo">
                <div className="gameCover">
                  <img src="" alt="" />
                </div>
                <div className="gameDetails">
                  <h2>Halo: Combat Evolved</h2>
                  <h5>12th November 2004</h5>
                  <h5>Action / Sci Fi / FPS</h5>
                  <p> Master chief is a badass motherfucker and he does all kinda cool shit untill the flood comes along and fucks up everybody.</p>
                </div>
              </div>
              <div className="contains-ratings">
                <div className="ourRating"></div>
                <div className="yourRating"></div>
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
      </Browser>
    )
  }
}


export default GameForum
