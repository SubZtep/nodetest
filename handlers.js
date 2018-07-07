const Twit = require('twit')
const Boom = require('boom')

// Init Twitter

var T = new Twit({
  consumer_key:         process.env.consumer_key,
	consumer_secret:      process.env.consumer_secret,
	access_token:         process.env.access_token_key,
  access_token_secret:  process.env.access_token_secret,
	/* consumer_key:         'a123',
	consumer_secret:      'a123',
	access_token:         'a1123',
	access_token_secret:  'a123', */
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL:            true,     // optional - requires SSL certificates to be valid.
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
  }

}
