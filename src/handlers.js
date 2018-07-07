const Twit = require('twit')
const Boom = require('boom')
const url = require('url')

// Init Twitter
const T = new Twit({
  consumer_key:         process.env.consumer_key,
	consumer_secret:      process.env.consumer_secret,
	access_token:         process.env.access_token_key,
  access_token_secret:  process.env.access_token_secret,
	timeout_ms:           60 * 1000,
	strictSSL:            true,
})

const handlers = {
  getUsername: profileUrl => {
    let loc = url.parse(profileUrl)
    if (typeof loc.pathname != 'undefined') {
      return loc.pathname.replace(/\//g, '')
    }
    return null
  },

  getTweetHandler: (request, h) => {
    let profileUrl = typeof request.query.url != 'undefined' ? request.query.url : null
    return new Promise((resolve, reject) => T.get(
      'statuses/user_timeline',
      {screen_name: handlers.getUsername(profileUrl), count: 10},
      (err, data, response) => {
        if (err) {
          reject(Boom.badRequest(`Fetch Twitter Error: ${err.message}`))
        } else {
          resolve(data)
        }
      }
    ))
  },

  postTweetHandler: (request, h) => {
    return new Promise((resolve, reject) => T.post(
      'statuses/update',
      {status: `Test (pls ignore ${Date.now()})`},
      (err, data, response) => {
        if (err) {
          reject(Boom.badRequest(`Post Twitter Error: ${err.message}`))
        } else {
          resolve(data)
        }
      }
    ))
  },
}

module.exports = handlers
