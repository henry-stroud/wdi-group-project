import React from 'react'
import { BrowserRouter as Browser } from 'react-router-dom'


// import Header from '../components/headandFoot/header'
// import Footer from '../components/headandFoot/footer'
import GameSearch from '../components/gameSearch'
import News from '../components/news'

const Home = () => {
  return(
    <Browser>
      <div>
        <main>
          <div className="contains-news-gameSearch">
            <GameSearch />
            <News />
          </div>
          <div className="homeChange">
            <h1> TO SOCIAL </h1>
          </div>
        </main>

      </div>
    </Browser>
  )
}

export default Home
