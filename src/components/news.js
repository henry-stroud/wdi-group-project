import React from 'react'
import axios from 'axios'

class News extends React.Component {
  constructor(){
    super()

    this.state = {}

  }



  getNews() {
    console.log('getting the news')
    axios.get('api/news')
      .then(res => this.setState({ articles: res.data.articles}))
      .catch(err => this.setState({ error: err.messsage }))
  }

  componentDidMount() {
    this.getNews()
  }

  render() {
    console.log(this.state)
    return(
      <div className="contains-news">
        {!this.state.articles && <p> ...getting the news...</p>}
        {this.state.articles && this.state.articles.map(article => (
          <div key={article._id} className="newscard">
            <h1> <a href={`${article.url}`}> {article.title} </a> </h1>
            <img src={article.urlToImage} atl={article.title} />
            <p> {article.description} </p>
          </div>
        ))}
      </div>
    )
  }

}

export default News
