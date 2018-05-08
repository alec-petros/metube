import React from 'react';
import { Link } from 'react-router-dom';


class VidContainer extends React.Component {

  render() {

    const videos = this.props.videos.map(video => {
      return (<div className='video-link'>
        <Link to={`/${video.data.id}`} id={video.data.id}>{video.data.attributes.name}</Link>
        <br/>
        </div>)
    })

    return (
      <div id="vid-container">
      <h1>Videos</h1>
        {videos}
      </div>
    )
  }
}

export default VidContainer
