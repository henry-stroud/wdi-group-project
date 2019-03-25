import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/auth'

class Header extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }



  render() {
    return (
      <div>
        <header>
          {!Auth.isAuthenticated() &&
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Log In</Link>
            <Link to="/gameforum">Games</Link>
            <Link to="/createprofile">Profile</Link>
          </nav>
          }
          {Auth.isAuthenticated() &&
            <div className="contains-loggedin">
              <img className="avatar" src="https://gaming-logo-maker.com/wp-content/uploads/2018/11/avatar-maker-minecraft-character-02-300x300.gif" alt=""/>
              <div className="userloggedin">
                <Link to='/viewprofile'> <h4> bubblesaurus90 </h4> </Link>
                <h5> currently playing... </h5>
                <a onClick={this.logout}>Logout</a>
              </div>
            </div>
          }
          <div className="contains-titleLogo">
            <h1>Player Connect</h1>
            <img src="https://i.pinimg.com/originals/aa/8d/46/aa8d4679b3b39e91b17cb4675ec0d60d.jpg" alt="playerconnect logo"/>
          </div>

        </header>
      </div>
    )
  }
}

export default withRouter(Header)
