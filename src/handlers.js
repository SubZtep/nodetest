const Twit = require('twit')
const Boom = require('boom')

// Init Twitter
const T = new Twit({
  consumer_key:         process.env.consumer_key,
	consumer_secret:      process.env.consumer_secret,
	access_token:         process.env.access_token_key,
  access_token_secret:  process.env.access_token_secret,
	timeout_ms:           60 * 1000,
	strictSSL:            true,
})

module.exports = {

  getTweetHandler: (request, h) => {
    return new Promise((resolve, reject) => T.get(
      'statuses/user_timeline',
      {screen_name: request.params.name, count: 10},
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
