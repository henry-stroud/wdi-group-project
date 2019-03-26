import React from 'react'
import {withRouter } from 'react-router-dom'


// import Header from '../components/headandFoot/header'
// import Footer from '../components/headandFoot/footer'
import GameSearch from '../components/gameSearch'
import News from '../components/news'
import Chat from '../components/chat'
import Videos from '../components/videos'


import Auth from '../lib/auth'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      toSocial: false,
      toLogin: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClickLogin = this.handleClickLogin.bind(this)

  }

  handleClick() {
    this.setState({...this.state, toSocial: !this.state.toSocial}, console.log(this.state))
  }

  handleClickLogin() {
    this.setState({...this.state, toLogin: !this.state.toLogin}, console.log(this.state))
  }

  render() {
    return(
      <div>
        <main>
          {this.state.toSocial === false ?
            <div className="contains-news-gameSearch">
              <News />
              <GameSearch />
            </div>
            :
            <div className="contains-news-gameSearch">
              <Chat />
              <Videos />
            </div>
          }
          {!Auth.isAuthenticated() && <div className="homeChange" onClick={this.handleClickLogin}>
            {this.state.toLogin === false ?
              <h1> LOGIN </h1>
              :
              this.props.history.push('/login')
            }
          </div>
          }
          {Auth.isAuthenticated() && <div className="homeChange" onClick={this.handleClick}>
            {this.state.toSocial === false ?
              <h1> TO SOCIAL </h1>
              :
              <h1> TO HOME </h1>
            }
          </div>
          }
        </main>
      </div>
    )
  }
}
export default withRouter(Home)
