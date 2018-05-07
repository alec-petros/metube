import React from 'react';

const CommentComp = props => {
  console.log(props)
  return(
    <li>
      <span>{props.comment.text}</span>
    </li>
  )
}

export default CommentComp
