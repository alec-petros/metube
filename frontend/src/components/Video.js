import React from 'react';
import CommentContainer from '../containers/CommentContainer'
import { Player } from 'video-react';

class Video extends React.Component {

  render() {
    console.log('video props', this.props)
    return(
      <div className='vid-display'>
        <div className='vid-details'>
          <h1>{this.props.video.data.attributes.name}</h1>
          <p>Description: {this.props.video.data.attributes.description}</p>
          <p>Posted by: {this.props.auth.username}</p>
          {this.props.auth && this.props.video.data.attributes.user_id === this.props.auth.user_id ? <button id={this.props.video.data.id} className='delete-button' onClick={this.props.deleteVideo}>Delete Video</button> : null}
        </div>
        <Player src={this.props.video.data.attributes.url} className="video-player" fluid={false} height={400} />
        <CommentContainer auth={this.props.auth} comments={this.props.video.included} videoId={this.props.video.data.id} />
        
        
      </div>
    )
  }

}

export default Video
