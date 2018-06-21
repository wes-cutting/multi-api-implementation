const { send, json } = require('micro')
// import { send } from 'micro' // Showing an ES6 import below ES5 import
const { router, get, post, put, del } = require('microrouter')
const cors = require('micro-cors')()
const monk = require('monk')

const url = 'mongodb://heliopeep:passw0rd@ds151530.mlab.com:51530/fs-intro'

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to mLab MongoDB Instance')
})

const collection = db.get('Books')

// Create a single Book
const createBook = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const body = await json(req)
    const dataToSend = await collection.insert({title: body.title, author: body.author})

    send(res, 200, dataToSend)
}

// Read all Books
const getAllBooks = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const dataToSend = await collection.find({}).then((docs) => docs)

    send(res, 200, dataToSend)
}

// Update a specific Book
const updateBook = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const body = await json(req)
    const dataToSend = await collection.update({ _id: body.id }, { title: body.title, author: body.author })

    send(res, 200, dataToSend)
}

// Delete a specific book
const deleteBook = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const dataToSend = await collection.remove({ _id: req.params.id })

    send(res, 200, dataToSend)
}

const hello = (req, res) => send(res, 200, `Hello ${req.params.name}`)

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = cors(
    router(
        get('/books', getAllBooks),
        post('/book', createBook),
        put('/book', updateBook),
        del('/book/:id', deleteBook),
        get('/hello/:name', hello),
        get('/*', notfound)
    )
)