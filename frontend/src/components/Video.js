import React from 'react';
import CommentContainer from '../containers/CommentContainer'
import { Player } from 'video-react';


class Video extends React.Component {

  render() {
    return(
      <div className="video">
        
        <Player src={this.props.video.url} className="video-player" fluid={false} height={400}>
        </Player>
        <CommentContainer auth={this.props.auth} videoId={this.props.video.id} />
        {this.props.auth && this.props.video.user_id === this.props.auth.user_id ? <button id={this.props.video.id} className='delete-button' onClick={this.props.deleteVideo}>Delete Video</button> : null}
      </div>
    )
  }

}

export default Video
