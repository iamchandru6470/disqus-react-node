import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const Comment = props => {
  const [commentStr, handleComment] = useState('');

  return (
    <li>
      <div className='module-comment-block'>
        <div className='module-comment-avatar'>
          <Avatar style={{ margin: 10 }}>H</Avatar>
        </div>
        <div className='module-comment-text'>
          <div>
            <span style={{ marginTop: 10 }}>
              <strong>{props.user && props.user.name}</strong>
            </span>
            {props.time ? (
              <span style={{ marginLeft: 10, color: '#acacac' }}>
                {new Date(props.time).toDateString()}
              </span>
            ) : null}
          </div>
          {props.commentBox ? (
            <React.Fragment>
              <div>
                <TextField
                  id='outlined-with-placeholder'
                  label='Add comment'
                  placeholder='Comment here'
                  margin='normal'
                  variant='outlined'
                  value={commentStr}
                  onChange={e => {
                    handleComment(e.target.value);
                  }}
                />
              </div>
              <Button
                color='primary'
                onClick={() => {
                  props.postComment(
                    props.parentId,
                    props.commentId,
                    props.postId,
                    commentStr
                  );
                }}
              >
                Comment
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div>{props.comment}</div>
              <Button
                color='primary'
                onClick={() => {
                  props.addReply(props.commentId);
                }}
              >
                Reply
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
      <ul>
        {props.children.map((child, idx) => (
          <Comment
            key={idx + 1 + child.parent_id + child.id + child.comment}
            {...child}
            user={props.user}
            time={child.time}
            parentId={child.parent_id}
            commentId={child.id}
            addReply={props.addReply}
            postComment={props.postComment}
            postId={props.postId}
          />
        ))}
      </ul>
    </li>
  );
};

export default Comment;
