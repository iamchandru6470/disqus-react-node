import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Comment from './Comment';

const useStyles = {
  flex: {
    flexGrow: 1
  },
  avatar: {
    margin: 10
  },
  root: {
    padding: 20
  }
};

const List = ({ comments, user, addReply, postComment, postId }) => (
  <ul>
    {comments.map((comment, idx) => (
      <Comment
        key={idx + comment.parent_id + comment.id + comment.comment}
        {...comment}
        user={user}
        commentId={comment.id}
        addReply={addReply}
        postComment={postComment}
        postId={postId}
        time={comment.time}
      />
    ))}
  </ul>
);

class Post extends React.Component {
  state = {
    post: this.props.post,
    comments: []
  };

  // Used to form the nested JSON from flatten array.
  nest(items, id = null) {
    return items
      .filter(item => item.parent_id === id)
      .map(item => ({ ...item, children: this.nest(items, item.id) }));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      posts: newProps.post,
      comments: newProps.comments
    });
  }

  componentDidMount() {
    axios.get(`/api/comments/${this.state.post.postId}`).then(res => {
      this.setState({
        comments: res.data.comments
      });
    });
  }

  addReply(parentId) {
    const comments = [...this.state.comments];
    if (comments.length > 0) {
      let found = false;
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].parent_id === parentId) {
          if (comments[i].commentBox) {
            found = true;
            comments.splice(i, 1);
            break;
          }
        }
      }
      if (!found) {
        comments.push({
          parent_id: parentId,
          id: comments.length + 1,
          commentBox: true
        });
      }
    } else {
      comments.push({
        parent_id: parentId,
        id: comments.length + 1,
        commentBox: true
      });
    }
    this.setState({
      comments
    });
  }

  postComment(parentId = null, commentId, postId, comment) {
    console.log(parentId, commentId, postId, comment);
    axios
      .post(`/api/comment/${postId}`, {
        userId: '123',
        parentId,
        commentId,
        comment
      })
      .then(res => {
        this.setState({
          comments: res.data.comments
        });
      });
  }

  render() {
    const { post, comments } = this.state;
    const { user, classes } = this.props;
    return (
      <div className={classes.flex}>
        <Grid container spacing={3}>
          <Grid item xs={12} key={post.postId}>
            <Paper className={classes.root}>
              <Typography variant='h5' component='h3'>
                {post.title}
              </Typography>
              <Typography component='p'>{post.content}</Typography>
              <br />
              <Button
                color='primary'
                onClick={() => {
                  this.addReply(null);
                }}
              >
                Reply
              </Button>
            </Paper>
            <List
              comments={this.nest(comments)}
              user={user}
              addReply={this.addReply.bind(this)}
              postComment={this.postComment.bind(this)}
              postId={post.postId}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(Post);
