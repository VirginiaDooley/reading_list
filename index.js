const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const books = require('google-books-search');
const prompt = require('prompt');
const port = process.env.PORT || 5000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server;

prompt.start();

prompt.get(['book_title'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  I want to find: ' + result.book_title);
});

function onErr(err) {
    console.log(err);
    return 1;
}
