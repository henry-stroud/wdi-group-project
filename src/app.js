import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import './style.scss'


import Header from './components/headandFoot/header'
import Footer from './components/headandFoot/footer'
import Register from './components/register'
import Home from './components/home'
import Login from './components/login'


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
          <Route path="/" component={Login} />
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
