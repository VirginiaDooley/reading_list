const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const books_search = require('google-books-search');
const port = process.env.PORT || 5000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server;
