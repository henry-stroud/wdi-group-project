import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { BrowserRouter as Browser } from 'react-router-dom'


class CreateProfile extends React.Component {
  constructor(){
    super()

    this.state = { data: {
      avatar: '',
      favoriteGames: []
    }
    }

  }

  // componentDidMount() {
  //   axios.get('/api/games')
  //     .then(res => res.data.map(games => ({ value: games._id, label: games.name })))
  //     .then(games => this.setState({ games }))
  //     .catch(err => console.log(err))
  // }

  //
  // handleChange() {
  //   const myGames = []
  //
  //
  // }

  handleSubmit (e) {
    e.preventDefault()
    axios.post('api/register', this.state.data)
      .then(res => console.log(res))
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
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
                {this.state.favoriteGames[0]}<  />
                <img  />
                <img  />
                <img  />
                <img  />
                <img  />
              </div>
            </div>

            <div className="comments-complete">
              <h3> Your comments will appear here on you profile.</h3>
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
