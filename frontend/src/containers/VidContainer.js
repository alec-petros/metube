import React from 'react';
import Video from '../components/Video'



class VidContainer extends React.Component {

  // state = {
  //   videos: []
  // }

  // fetchVideos(){
  //   fetch(url)
  //   .then(r => r.json())
  //   .then(json => this.setState({
  //     videos: json
  //   }))
  // }

  // componentDidMount() {
  //   this.fetchVideos()
  // }

  // componentDidUpdate() {
  //   this.fetchVideos()
  // }

  render() {
    const videos = this.props.videos.map(video => {
      return (<Video auth={this.props.auth} key={video.handle} video={video} deleteVideo={this.props.deleteVideo}/>)
    })

    return (
      <div>
        {videos}
      </div>
    )
  }
}

export default VidContainer
