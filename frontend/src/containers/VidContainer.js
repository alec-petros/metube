import React from 'react';
import Video from '../components/Video'

const url = "http://localhost:3000/videos"

class VidContainer extends React.Component {

  state = {
    videos: []
  }

  componentDidMount() {
    fetch(url)
    .then(r => r.json())
    .then(json => this.setState({
      videos: json
    }))
  }

  render() {
    const videos = this.state.videos.map(video => {
      return (<Video auth={this.props.auth} key={video.handle} video={video} />)
    })

    return (
      <div>
        {videos}
      </div>
    )
  }
}

export default VidContainer
