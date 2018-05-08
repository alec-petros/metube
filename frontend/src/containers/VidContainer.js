import React from 'react';
import Video from '../components/Video'



class VidContainer extends React.Component {

  render() {
    const videos = this.props.videos.map(video => {
      return (<Video auth={this.props.auth} key={video.data.attributes.handle} video={video} deleteVideo={this.props.deleteVideo}/>)
    })

    return (
      <div id="vid-container">
        {videos}
      </div>
    )
  }
}

export default VidContainer
