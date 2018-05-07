import React from 'react';
import CommentForm from '../components/CommentForm'
import CommentComp from '../components/CommentComp'

class CommentContainer extends React.Component {

  state = {
    comments: [],
    commentText: ""
  }

  componentDidMount() {
    fetch(`http://localhost:3000/videos/${this.props.videoId}/comments`)
    .then(r => r.json())
    .then(json => this.setState({comments: json}))
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

    const comments = this.state.comments.map(comment => <CommentComp key={comment.id} comment={comment} />)

    return (
      <div className="comment-container">
        {comments}
        <CommentForm commentText={this.state.commentText} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default CommentContainer
