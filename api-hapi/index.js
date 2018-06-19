'use strict';

const Hapi = require('hapi');
const monk = require('monk')

const url = 'mongodb://heliopeep:passw0rd@ds151530.mlab.com:51530/fs-intro'

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to mLab MongoDB Instance')
})

const collection = db.get('Books')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
    method: 'GET',
    path: '/books',
    handler: async (req, res) => {
        return await collection.find({}).then((docs) => docs)
    }
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();