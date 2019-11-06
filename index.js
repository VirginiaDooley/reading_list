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
async function search(){

  try {

//limit results to 5 books
    var options = {
     offset: 0,
     limit: 5,
     type: 'books',
     order: 'relevance',
     lang: 'en'
   }

  //ask for user input for book search
    prompt.get(['book_search'], async function (req, res) {
      console.log('  I want to search for: ' + res.book_search)

      //search books
      await books.search(res.book_search, options, async function(req, res) {
        const books = res
        books.map((book, index) => {
          console.log(index + 1 + ":")
          console.log('Title: ' + book.title)
          console.log('Author(s): ' + book.authors)
          console.log('Publisher: ' + book.publisher)
          // console.log('Choose a book number 1-5 to add it to your reading list')
        })
      })
    })
    // end of try
  } catch (err) {
    console.error(err.message)
  }
}
//end search function

function chooseBook(){
  //set timeout here?
  prompt.get(['index'], async function (req, res) {
    const index = res.index
      if (index === 'exit') {
        console.log('goodbye!');
        // exit!
      } else if (index <= 5) {
        addBooks(index)
      } else {
        console.log('Please choose 1-5')
        addBooks(index)
      }
  })
}


function addBooks(index){
  const book_index = parseInt(index) - 1
  const chosen_book = books[book_index]
  reading_list.push(chosen_book)
  return reading_list
  menu()
}

function printList(){
  if (reading_list.length > 0) {
    reading_list.map((book, index) => {
      console.log(index + 1 + ": " + "Title: " + book.title)
    })
    menu()
  } else {
    console.log("Your reading list is currently empty. Search and select books to add.")
    search()
  }
}
