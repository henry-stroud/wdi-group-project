import React from 'react'
import axios from 'axios'

class Videos extends React.Component {
  constructor(){
    super()

    this.state = {}

  }

  getVideos() {
    axios.post('api/game-videos')
      .then(res => this.setState({ videos: res.data}))
      .catch(err => this.setState({ error: err.message }))
  }

  componentDidMount() {
    this.getVideos()
  }

  render() {
    return(
      <div className="contains-news animated fadeIn">
        {!this.state.videos && <p> ...getting video feed...</p>}
        {this.state.videos && this.state.videos.map((video, i ) => (
          <div className="embeddedVideos animated fadeIn" key={i}>
            <iframe width="560" height="250" src={`https://www.youtube.com/embed/${video.video_id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        ))}
      </div>
    )
  }

}


export default Videos
