var express = require('express');
var bodyParser = require('body-parser');
var books = require('google-books-search');
var prompt = require('prompt');
var nodemon = require('nodemon');
var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen();
module.exports = server;

var readingList = [];

menu();

//start of menu function
function menu(){
  prompt.start(
    //add option to exit
    console.log("Enter 'search' to search and add books to your reading list; Enter 'print' to print your reading list.")
  );
  prompt.get(['answer'], async function (req, res) {
    if (res.answer === 'search'){
      search();
    } else if (res.answer === 'print') {
      printList();
    } else {
      console.log("Please try again.");
      menu();
    }
  });
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
    };

  //ask for user input for book search
    prompt.get(['bookSearch'], async function (req, res) {
      console.log('  I want to search for: ' + res.bookSearch);

      //search books
      await books.search(res.bookSearch, options, async function(req, res) {
        var books = res;
        books.map((book, index) => {
          console.log(index + 1 + ":");
          console.log('Title: ' + book.title);
          console.log('Author(s): ' + book.authors);
          console.log('Publisher: ' + book.publisher);
        });
        //ask for user input on book choice
      await prompt.get(['index'], async function (req, res) {
        var index = res.index;
        var int = parseInt(index);
        console.log("You entered: " + res.index);
          if (index <= 5) {
            var id = books[index - 1];
            readingList.push(id);
            printList();
            menu();
          } else if (res.index === 'exit') {
            console.log('goodbye!');
            process.exit();
          } else {
            console.log('Please choose 1-5');
            // rerun prompt
          }
      });
      //end user choice
      });
    });
    // end of try
  } catch (err) {
    console.error(err.message);
  }
}
//end search function

function printList(){
  if (readingList.length > 0) {
    readingList.map((book, index) => {
      console.log("Your reading list currently includes: " + 
      index + 1 + ": " + "Title: " + book.title);
    });
    menu();
  } else {
    console.log("Your reading list is currently empty. Search and select books to add.");
    search();
  }
}