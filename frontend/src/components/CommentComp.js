import React from 'react';

const CommentComp = props => {
  console.log(props)
  return(
    <li>
      <span>{props.comment.text}</span><br></br>
      <span className="comment-username">By {props.comment.username}</span>
    </li>
  )
}

export default CommentComp
