import React from 'react'
import { BrowserRouter as Browser } from 'react-router-dom'


// import Header from '../components/headandFoot/header'
// import Footer from '../components/headandFoot/footer'
import GameSearch from '../components/gameSearch'
import News from '../components/news'
import Chat from '../components/chat'
import Videos from '../components/videos'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      toSocial: false
    }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick() {
    this.setState({...this.state, toSocial: !this.state.toSocial}, console.log(this.state))
  }

  render() {
    return(
      <Browser>
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
            <div className="homeChange" onClick={this.handleClick}>
              {this.state.toSocial === false ?
                <h1> TO SOCIAL </h1>
                :
                <h1> TO HOME </h1>
              }
            </div>
          </main>

        </div>
      </Browser>
    )
  }
}
export default Home
