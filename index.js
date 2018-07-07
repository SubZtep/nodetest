const Hapi = require('hapi')
const Vision = require('vision')
const Twit = require('twit')
const Pug = require('pug')

const PORT = process.env.PORT || 5000
const server = new Hapi.Server({
	port: PORT
})


// Init Twitter

var T = new Twit({
	consumer_key:         process.env.consumer_key,
	consumer_secret:      process.env.consumer_secret,
	access_token:         process.env.access_token_key,
	access_token_secret:  process.env.access_token_secret,
	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
	strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


// Routes

server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => h.view('index')
})

server.route({
	method: 'GET',
	path: '/tweets/{user}',
	handler: (request, h) => {
    //console.log(request.params)
    T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
      console.log(data)
    })
		return 'yolo'
	}
})


// Start server

const startup = async () => {
	await server.register(Vision)
	server.views({
        engines: { pug: Pug },
        relativeTo: __dirname,
        path: 'public'
	})
	try {
		await server.start()
		console.log('Server running at:', server.info.uri)
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}
startup()
