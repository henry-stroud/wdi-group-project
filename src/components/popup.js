import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'

import axios from 'axios'

class Popup extends React.Component {
  constructor() {
    super()

    this.state = {
      comments: 'test',
      ratings: [],
      redirect: false
    }
  }

  handleClick(item) {
    console.log(item.id)
    axios.post('api/localgames', { gameId: item.id })
      .then((res)=> this.setState({...this.state, specificGame: res.data }, () => this.setState({...this.state, redirect: !this.state.redirect}, () => console.log(this.state.specificGame, 'hello'))))
      .catch((err) => console.log(err))
  }


  render() {
    if(!this.props.show) {
      return null
    }
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>Cancel</button>
          <ul>
            {this.props.games.map((item) =>
              <li key={item.id} onClick={() => this.handleClick(item)}>
                {this.state.redirect && <Redirect
                  to={{
                    pathname: '/gameforum',
                    state: {
                      game: item,
                      specificGame: this.state.specificGame
                    }
                  }}></Redirect>}{item.name}
              </li>
            )}
          </ul>
        </div>
      </div>

    )
  }
}

export default withRouter(Popup)
