const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const books = require('google-books-search');
const prompt = require('prompt');
const port = process.env.PORT || 5000;

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen()
module.exports = server;

prompt.start(console.log('Enter a book name or subject'));

prompt.get(['book_search'], async function (err, result) {
    if (err) { return onErr(err); }
      console.log('  I want to search for: ' + result.book_search)

 try {
   var options = {
    offset: 0,
    limit: 5,
    type: 'books',
    order: 'relevance',
    lang: 'en'
  };

  const reading_list = []

    books.search(result.book_search, options, async function(error, results) {
      if ( ! error ) {
        const books = results
        books.map((book, index) => {
          console.log(index + 1 + ":")
          console.log('Title: ' + book.title)
          console.log('Author(s): ' + book.authors)
          console.log('Publisher: ' + book.publisher)
          console.log('Choose a book number to add it to your reading list')
        })

        const chooseBook = await prompt.get(['index'], async function (err, result) {
          if (err) { return onErr(err); }
          console.log('  I want to add book #' + result.index + ' to my reading list');
          const index = result.index

          addBooks(index)
        })

        const addBooks = (index) => {
          let book_index = parseInt(index)
          let chosen_book = books[book_index]
          reading_list.push(chosen_book)
          let bookshelf = reading_list.map(book => book.title)
          console.log("Your reading list currently includes: " + bookshelf)
          // add menu with prompts to search again and print reading list again
        }

      } else {
        console.log(error);
      }
    })
    function onErr(err) {
      console.log(err);
      return 1;
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send("something went bad");
  }
})