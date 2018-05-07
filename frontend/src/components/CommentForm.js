import React from 'react';

const CommentForm = props => {
  return (
    <form onChange={props.handleChange} onSubmit={props.handleSubmit}>
      <input type="text" name="comment" value={props.commentText}></input>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CommentForm
