import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
||||||| e6bba8e... progress on individual pages
import Video from '../components/Video'
import { Link } from 'react-router-dom';
=======
import Video from '../components/Video'

>>>>>>> parent of e6bba8e... progress on individual pages


class VidContainer extends React.Component {

  render() {

    const videos = this.props.videos.map(video => {
      return (<Video auth={this.props.auth} key={video.handle} video={video} deleteVideo={this.props.deleteVideo} selectVideo={this.props.selectVideo}/>)
    })

    return (
      <div id="vid-container">
        {videos}
      </div>
    )
  }
}

export default VidContainer
