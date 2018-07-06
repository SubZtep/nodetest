/*const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .get('/', (req, res) => res.send('csao'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

const Hapi = require('hapi')
const server = new Hapi.Server({
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'hello world'
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