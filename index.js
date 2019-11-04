const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const books = require('google-books-search');
const prompt = require('prompt');
const nodemon = require('nodemon')
const port = process.env.PORT || 5000;

const reading_list = []

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen()
module.exports = server;

menu()

//start of menu function
function menu(){
  prompt.start(
    //add option to exit
    console.log("Enter 'search' to search and add books to your reading list; Enter 'print' to print your reading list.")
  )
  prompt.get(['choice'], async function (req, res) {
    if (res.choice === 'search'){
      search()
    } else if (res.choice === 'print') {
      printList()
    } else {
      console.log("Please try again.")
      menu()
    }
  })
}
//end of menu function

//start of search function
function search(){

//limit results to 5 books
  var options = {
   offset: 0,
   limit: 5,
   type: 'books',
   order: 'relevance',
   lang: 'en'
 }

//ask for user input for book search
  prompt.get(['book_search'], async function (err, result) {
    if (err) { return onErr(err); }
      console.log('  I want to search for: ' + result.book_search)

//search books
  books.search(result.book_search, options, async function(error, results) {

      if ( ! error ) {
        const books = results
        books.map((book, index) => {
          console.log(index + 1 + ":")
          console.log('Title: ' + book.title)
          console.log('Author(s): ' + book.authors)
          console.log('Publisher: ' + book.publisher)
          console.log('Choose a book number 1-5 to add it to your reading list')
        })

        const chooseBook = await prompt.get(['index'], async function (err, result) {
          if (err) { return onErr(err); }
          // const book = books.find(book => book.id === parseInt(req.params.id))
          // if (!book) res.status.(404).send('The book was not found') //404
          // res.send(book)
          const index = result.index
          if (index === 'exit') {
            console.log('goodbye!');
            // exit!
          } else if (index <= 5) {
            addBooks(index)
            // return to menu choices to add another book or search again
          } else {
            console.log('Please choose 1-5')
          addBooks(index)
          }
        })

      } else {
        console.log(error);
      }
    })
    function onErr(err) {
      console.log(err);
      return 1;
    }
  })
  // catch (err) {
  //   console.log(err);
  //   res.status(500).send("something went bad");
  // }
}
//end search function

function addBooks(index){
  const book_index = parseInt(index) - 1
  const chosen_book = books[book_index]
  reading_list.push(chosen_book)
  // const bookshelf = reading_list.map(book => book.title)
  return reading_list
  // reading_list.push(bookshelf)
  menu()
}

const printList = () => {
  if (reading_list.length > 0) {
    console.log(reading_list.map(book => book.title))
  } else {
    console.log("Your reading list is currently empty. Search and select books to add.")
    search()
  }
}
