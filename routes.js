const handlers = require('./handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('index')
  },
  {
    method: 'GET',
    path: '/tweets/{user}',
    handler: handlers.getTweetHandler
  }
]
