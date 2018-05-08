import React from 'react';

const CommentComp = props => {
  return (
    <div className='comment'>
      <span className='comment-text'>{props.comment.text}</span><br></br>
      <span className="comment-username">- {props.comment.username}</span>
      <br/>
    </div>
  )
}

export default CommentComp
