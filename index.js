const Hapi = require('hapi')
const Twitter = require('twitter')

const PORT = process.env.PORT || 5000

const server = new Hapi.Server({
	port: PORT
})

let client = new Twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
})

server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		//return 'hello hapi '+process.env.consumer_key

		return client
		/*setTimeout(() => {
			client.get('favorites/list', (error, tweets, response) => {
				if (error) throw error;
				//console.log(tweets);  // The favorites.
				//console.log(response);  // Raw response object.
				return tweets
			})
		}, 1500)*/
	}
})

async function start() {
	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);
};

start();
