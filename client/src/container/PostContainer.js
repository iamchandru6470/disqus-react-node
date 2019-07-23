import React from 'react';
import axios from 'axios';
import Post from '../components/Post';

class PostContainer extends React.Component {
  state = {
    posts: [],
    user: null
  };

  componentDidMount() {
    axios.get('/api/loggedInuser').then(res => {
      const user = res.data;
      axios.get(`api/posts`).then(res => {
        this.setState({
          user,
          posts: res.data
        });
        console.log(res);
      });
    });
  }

  render() {
    const { posts, user, selectedUser } = this.state;
    return (
      <React.Fragment>
        {posts.length > 0
          ? posts.map(post => (
              <Post
                post={post}
                key={post.postId}
                comments={post.comments}
                user={user}
              />
            ))
          : null}
      </React.Fragment>
    );
  }
}

export default PostContainer;
