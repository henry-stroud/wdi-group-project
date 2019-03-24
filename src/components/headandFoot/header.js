import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

  }
  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Log In</Link>
          </nav>
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
