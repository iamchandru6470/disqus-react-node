import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import PostContainer from './container/PostContainer';
import './App.css';

// Note: Assume this app is built for single user
const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <h1 className='App'>Disqus</h1>
        <PostContainer />
      </Container>
    </React.Fragment>
  );
};

export default App;
