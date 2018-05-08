import React from 'react';
import CommentForm from '../components/CommentForm'
import CommentComp from '../components/CommentComp'

class CommentContainer extends React.Component {

  state = {
    comments: [],
    commentText: ""
  }

  handleChange = (e) => {
    this.setState({commentText: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`},
      body: JSON.stringify({comment: {
        user_id: this.props.auth.user_id,
        video_id: this.props.videoId,
        text: this.state.commentText
      }})
    }).then(r => r.json()).then(json=>this.setState({
      comments: [...this.state.comments, {...json, username: this.props.auth.username}],
      commentText: ""}))
  }

  render() {

    const comments = this.props.comments.map(comment => <CommentComp key={comment.attributes.id} comment={comment.attributes} />)

    return (
      <div className="comment-container">
        {comments}
        <CommentForm commentText={this.state.commentText} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default CommentContainer
