import React from 'react';
import CommentContainer from '../containers/CommentContainer'
import { Player } from 'video-react';
import { Link } from 'react-router-dom';

class Video extends React.Component {

  render() {
    return(
      <div className="video">
        <Link to={`/${this.props.video.id}`} id={this.props.video.id} onClick={this.props.selectVideo}>{this.props.video.name}</Link>
        <Player src={this.props.video.url} className="video-player" fluid={false} height={400}>
        </Player>
        <CommentContainer auth={this.props.auth} videoId={this.props.video.id} />
        {this.props.auth && this.props.video.user_id === this.props.auth.user_id ? <button id={this.props.video.id} className='delete-button' onClick={this.props.deleteVideo}>Delete Video</button> : null}
      </div>
    )
  }

}

export default Video
