import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    const {status, content} = comment;
    let contentMsg;

    if(status === 'approved'){
      contentMsg = content;
    }else if(status === 'pending'){
      contentMsg = 'Pending approval'
    }else if(status === 'rejected'){
      contentMsg = 'rejected'
    }
    return <li key={comment.id}>{contentMsg}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
