import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'
import Favicon from 'react-favicon'


import './style.scss'


import Header from './components/headandFoot/header'
import Footer from './components/headandFoot/footer'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/home'
import NoMatch from './components/noMatch'
import CreateProfile from './components/createprofile'
import GameForum from './components/gameforum'
import ViewProfile from './components/viewprofile'
import ViewOtherUserProfile from './components/viewOtherUserProfile'


class App extends React.Component {
  constructor() {
    super()
    this.state = { data: {} }
  }

  render() {
    return (
      <Browser>
        <div>
          <Favicon url="./assets/logoFinal.png" />
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/gameforum" component={GameForum} />
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/createprofile" component={CreateProfile} />
            <Route path="/viewprofile" component={ViewProfile} />
            <Route path="/viewotherprofile" component={ViewOtherUserProfile} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Browser>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
