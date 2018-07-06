
const PORT = process.env.PORT || 5000

const Hapi = require('hapi')
const server = new Hapi.Server({
	port: PORT
})

server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		return 'hello hapi '+process.env.consumer_key
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
