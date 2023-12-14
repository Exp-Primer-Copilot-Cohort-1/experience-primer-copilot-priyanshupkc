// Create web server
// Run: node comments.js
// Test: http://localhost:8080/comments
// Test: http://localhost:8080/comments?postId=1
// Test: http://localhost:8080/comments?postId=1&userId=1

var http = require('http');
var url = require('url');

var comments = [
  { id: 1, userId: 1, postId: 1, content: 'Hello world!' },
  { id: 2, userId: 2, postId: 1, content: 'This is a test.' },
  { id: 3, userId: 3, postId: 2, content: 'I like Node.js.' },
  { id: 4, userId: 4, postId: 2, content: 'I like JavaScript.' },
  { id: 5, userId: 5, postId: 2, content: 'I like C#.' }
];

var server = http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  var postId = query.postId;
  var userId = query.userId;

  var result = comments;
  if (postId) {
    result = result.filter(function (comment) {
      return comment.postId == postId;
    });
  }
  if (userId) {
    result = result.filter(function (comment) {
      return comment.userId == userId;
    });
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result));
});

server.listen(8080);
console.log('Server is listening on port 8080');