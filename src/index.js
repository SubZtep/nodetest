const path = require('path')
const hapi = require('hapi')
const vision = require('vision')
const pug = require('pug')
const routes = require('./routes')

// Start server

const server = new hapi.Server({
  port: process.env.PORT || 5000
})
server.route(routes)

const startup = async () => {

  await server.register(vision)
  server.views({
    engines: { pug },
    relativeTo: path.resolve(__dirname, '../'),
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
