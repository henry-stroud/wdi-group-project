import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { BrowserRouter as Browser } from 'react-router-dom'


class CreateProfile extends React.Component {
  constructor(){
    super()
  }

  componentDidMount() {
    axios.get('/api/games')
      .then(res => console.log(res))
      .catch(err => console.log(err))
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
              <Select
                className="chooseMyGames"
                // options={this.state.games}
              />
              <div className="mygames">
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
              </div>
            </div>

            <div className="comments-complete">
              <h3> Your comments will appear here on you profile! </h3>
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
