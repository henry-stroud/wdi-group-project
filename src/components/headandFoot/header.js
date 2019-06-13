import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import Auth from '../../lib/auth'

class Header extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    this.getProfile()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname === '/login' && this.props.location.pathname === '/') {
      this.getProfile()
    }
    if(prevProps.location.pathname === '/register' && this.props.location.pathname === '/createprofile') {
      this.getProfile()
    }
    if(prevProps.location.pathname === '/createprofile' && this.props.location.pathname === '/') {
      this.getProfile()
    }
  }

  logout() {
    Auth.logout()
    this.props.history.push('/')
  }


  getProfile() {
    axios.get('api/users', { headers: { Authorization: `Bearer ${Auth.getToken()}`} } )
      .then((user) => this.setState({...this.state, data: user.data}))
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
          </nav>
          }
          {Auth.isAuthenticated() &&
            <div className="contains-loggedin">
              <img className="avatar" src={this.state.data.avatar} alt=""/>
              <div className="userloggedin">
                <Link to='/viewprofile'> <h2> {this.state.data.username} </h2> </Link>
                <a onClick={this.logout}>logOut</a>
              </div>
            </div>
          }
          <div className="contains-title">
            <h1>player connect</h1>
          </div>
          <div className="contains-logo">
            <Link to='/'><img src="../../../assets/logofinal.png" alt="playerconnect logo"/></Link>
          </div>

        </header>
      </div>
    )
  }
}

export default withRouter(Header)
