import React from 'react';
import CommentContainer from '../containers/CommentContainer'
import { Player } from 'video-react';
import { Link } from 'react-router-dom';

class Video extends React.Component {

  render() {
    console.log(this.props)
    return(
      <div className="video">
<<<<<<< HEAD

        <Player src={this.props.video.data.attributes.url} className="video-player" fluid={false} height={400}>
||||||| e6bba8e... progress on individual pages
        
        <Player src={this.props.video.url} className="video-player" fluid={false} height={400}>
=======
        <Link to={`/${this.props.video.id}`} id={this.props.video.id} onClick={this.props.selectVideo}>{this.props.video.name}</Link>
        <Player src={this.props.video.url} className="video-player" fluid={false} height={400}>
>>>>>>> parent of e6bba8e... progress on individual pages
        </Player>
        <CommentContainer auth={this.props.auth} comments={this.props.video.included} videoId={this.props.video.data.id} />
        {this.props.auth && this.props.video.user_id === this.props.auth.user_id ? <button id={this.props.video.data.id} className='delete-button' onClick={this.props.deleteVideo}>Delete Video</button> : null}
      </div>
    )
  }

}

export default Video
