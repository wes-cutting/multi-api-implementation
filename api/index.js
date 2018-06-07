const { send } = require('micro')
// import { send } from 'micro' // Showing an ES6 import below ES5 import
const { router, get } = require('microrouter')
const monk = require('monk')

const url = 'mongodb://heliopeep:passw0rd@ds151530.mlab.com:51530/fs-intro'

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to mLab MongoDB Instance')
})

const collection = db.get('Books')

const books = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const dataToSend = await collection.find({}).then((docs) => docs)

    send(res, 200, dataToSend)
}

const hello = (req, res) => send(res, 200, `Hello ${req.params.name}`)

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router(
    get('/books', books),
    get('/hello/:name', hello),
    get('/*', notfound)
)