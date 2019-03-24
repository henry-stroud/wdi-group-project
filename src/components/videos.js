import React from 'react'
import axios from 'axios'

class Videos extends React.Component {
  constructor(){
    super()

    this.state = {}

  }

  getVideos() {
    console.log('getting videos')
    axios.post('api/game-videos')
      .then(res => this.setState({ videos: res.data}))
      .then(console.log(this.state))
      .catch(err => this.setState({ error: err.message }))
  }

  componentDidMount() {
    this.getVideos()
  }

  render() {
    console.log(this.state)
    return(
      <div className="contains-news">
        {!this.state.videos && <p> ...getting video feed...</p>}
        {this.state.videos && this.state.videos.map((video, i ) => (
          <div key={i}>
            <iframe width="560" height="250" src={`https://www.youtube.com/embed/${video.video_id}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        ))}
      </div>
    )
  }

}


export default Videos
