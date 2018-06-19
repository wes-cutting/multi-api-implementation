const express = require('express')
const monk = require('monk')
const bodyParser = require('body-parser')

const app = express()

const url = 'mongodb://heliopeep:passw0rd@ds151530.mlab.com:51530/fs-intro'

const db = monk(url);

db.then(() => {
    console.log('Connected correctly to mLab MongoDB Instance')
})

const collection = db.get('Books')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE");
    next();
});

app.use(bodyParser.json())

// Create a single Book
const createBook = async (req, res) => {
    const body = await req.body
    const dataToSend = await collection.insert({title: body.title, author: body.author})

    res.send(dataToSend)
}

// Read all Books
const getAllBooks = async (req, res) => {
    const dataToSend = await collection.find({}).then((docs) => docs)

    res.send(dataToSend)
}

// Update a specific Book
const updateBook = async (req, res) => {
    const body = await req.body
    console.log(body)
    const dataToSend = await collection.update({ _id: body.id }, { title: body.title, author: body.author })

    res.send(dataToSend)
}

// Delete a specific book
const deleteBook = async (req, res) => {
    const dataToSend = await collection.remove({ _id: req.params.id })

    res.send(dataToSend)
}

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/books', getAllBooks)
app.post('/books', createBook)
app.put('/books', updateBook)
app.delete('/books/:id', deleteBook)

app.listen(3000, () => console.log('Example app listening on port 3000!'))