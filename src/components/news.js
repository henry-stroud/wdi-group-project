import React from 'react'
import axios from 'axios'

class News extends React.Component {
  constructor(){
    super()

    this.state = {}

  }

  getNews() {
    axios.get('api/news')
      .then(res => this.setState({ articles: res.data.articles}))
      .catch(err => this.setState({ error: err.messsage }))
  }

  componentDidMount() {
    this.getNews()
  }

  render() {
    return(
      <div className="contains-news animated fadeIn">
        {!this.state.articles && <h1> ...getting the news...</h1>}
        {this.state.articles && this.state.articles.map((article, i ) => (
          <div key={i} className="newscard animated fadeIn" style = {{backgroundImage: `url(${article.urlToImage})`}}>
            <div className="newstext">
              <h2> <a target='_blank'  rel="noopener noreferrer" href={`${article.url}`}> {article.title} </a> </h2>
              <p> {article.description} </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default News
