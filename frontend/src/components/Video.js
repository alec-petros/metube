import React from 'react';
import CommentContainer from '../containers/CommentContainer'
import { Player } from 'video-react';

class Video extends React.Component {

  render() {
    console.log(this.props.video)
    return(
      <div className="video">
        <Player src={this.props.video.url} className="video-player" fluid={false} height={500}>
        </Player>
        <CommentContainer auth={this.props.auth} videoId={this.props.video.id} />
      </div>
    )
  }

}

export default Video
