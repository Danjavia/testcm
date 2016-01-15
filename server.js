import express from 'express'
import fs from 'fs'
import path from 'path'

let app = express()
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/users.json', (req, res) => {
	res.sendFile(__dirname + '/data/users.json')
})

app.get('/products.json', (req, res) => {
	res.sendFile(__dirname + '/data/products.json')
})

const server = app.listen(8000, () => {
	const host = server.address().address
	const port = server.address().port

	console.log( 'init server at http://%s:%s', host, port )
})