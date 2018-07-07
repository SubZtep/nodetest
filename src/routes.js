const handlers = require('./handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('index')
  },
  {
    method: 'GET',
    path: '/app.js',
    handler: (request, h) => h.file('app.js')
  },
  {
    method: 'GET',
    path: '/tweets',
    handler: handlers.getTweetHandler
  },
  {
    method: 'POST',
    path: '/tweet',
    handler: handlers.postTweetHandler
  },
]
