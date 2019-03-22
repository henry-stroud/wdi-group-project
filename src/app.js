import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import './style.scss'


import Header from './components/headandFoot/header'
import Footer from './components/headandFoot/footer'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/home'
import GameSearch from './components/gameSearch'
import News from './components/news'



class App extends React.Component {
  constructor() {
    super()
    this.state = { data: {} }
  }

  render() {
    return (
      <Browser>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/" component={GameSearch}/>
            <Route path="/" component={News}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>

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
