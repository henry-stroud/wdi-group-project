import React from 'react'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import Header from '../components/headandFoot/header'
import Footer from '../components/headandFoot/footer'


const Home = () => {
  return(
    <Browser>
      <div>
        <News />
        <GameForum />
        <Social />
        <Videos />
      </div>
    </Browser>
  )
}

export default Home
