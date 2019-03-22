import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { BrowserRouter as Browser } from 'react-router-dom'


class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = {}

  }

  componentDidMount() {
    axios.get('/api/games')
      .then(res => res.data.map(games => ({ value: games._id, label: games.name })))
      .then(games => this.setState({ games }))
      .catch(err => console.log(err))
  }

  // componentDidMount() {
  //   axios.get('/api/games')
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }
  //
  // handleChange() {
  //   const myGames = []
  //
  //
  // }

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
                <img  />
                <img  />
                <img  />
                <img  />
                <img  />
                <img  />
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
