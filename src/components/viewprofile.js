import React from 'react'

class ViewProfile extends React.Component{
  constructor(){
    super()

    this.state = {data: {
      username: '',
      avatar: '',
      favoriteGames: [],
      errors: {}
    }}
  }

  render(){
    return(
      <main>
        <div className="contains-createProfile">
          <div className="userDetails">
            <img className="avatar" src={this.state.avatar} />
            <button
              onClick={this.handleClick}>
                Change photo
            </button>
            <h2 className="userName"> Welcome back, {this.state.username}. </h2>
          </div>

          <div className="chooseGame">
            <h2> My top 6 games </h2>
            <div className="mygames">
              <div> {this.state.data.favoriteGames[0]} </div>
              <div> {this.state.data.favoriteGames[1]} </div>
              <div> {this.state.data.favoriteGames[2]} </div>
              <div> {this.state.data.favoriteGames[3]} </div>
              <div> {this.state.data.favoriteGames[4]} </div>
              <div> {this.state.data.favoriteGames[5]} </div>
            </div>
          </div>

          <div className="comments-complete">
            <h3> Your comments will appear here on you profile.</h3>
            <div className="comments"> </div>
            <button className="completeProfile">Complete profile!</button>
          </div>
        </div>
      </main>
    )
  }
}


export default ViewProfile
