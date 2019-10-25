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

var options = {
    field: 'title',
    offset: 0,
    limit: 5,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

prompt.get(['book_title'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  I want to find: ' + result.book_title);

    books.search(result.book_title, options, function(error, results) {
        if ( ! error ) {
          results.map(book => {
            console.log('Title: ' + book.title)
            console.log('Author(s): ' + book.authors)
            console.log('Publisher: ' + book.publisher)
          })
        } else {
            console.log(error);
        }
    });

});

function onErr(err) {
    console.log(err);
    return 1;
}
