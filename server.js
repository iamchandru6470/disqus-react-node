const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');
const app = express();

app.use(bodyParser.json());
const router = express.Router();

router.get('/posts', (req, res) => {
  console.log(posts);
  res.send(posts);
});

// Mocking the logged in user
router.get('/loggedInuser', (req, res) => {
  res.send(users[0]);
});

router.post('/comment/:postId', (req, res) => {
  const idx = comments.findIndex(item => item.postId === req.params.postId);
  console.log('index', idx);
  let postComments = {};
  if (idx > -1) {
    fetchedComments = [...comments];
    fetchedComments[idx].comments.push({
      parent_id: req.body.parentId,
      id: req.body.commentId,
      comment: req.body.comment,
      time: new Date()
    });
    postComments = fetchedComments[idx];
  }
  res.send(postComments);
});

router.get('/comments/:postId', (req, res) => {
  let postComment = { postId: req.params.postId, comments: [] };
  for (let i = 0; i < comments.length; i++) {
    if (req.params.postId === comments[i].postId) {
      postComment.comments = [...comments[i].comments];
      break;
    }
  }
  res.send(postComment);
});

app.use('/api', router);

app.listen(5000, () => {
  console.log('server running on port 5000');
});
