const Hapi = require('hapi')
const Vision = require('vision')
const Pug = require('pug')

const routes = require('./routes')


// Start server

const server = new Hapi.Server({
  port: process.env.PORT || 5000
})

server.route(routes)

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
