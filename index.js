var express = require('express');
var bodyParser = require('body-parser');
var googleBooks = require('google-books-search');
var prompt = require('prompt');
var nodemon = require('nodemon');
var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.listen();
module.exports = server;

var readingList = [];

menu();


function menu(){
  prompt.start(
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

async function search(){

  try {

    var options = {
     offset: 0,
     limit: 5,
     type: 'books',
     order: 'relevance',
     lang: 'en'
    };

    prompt.get(['bookSearch'], async function (req, res) {
      console.log('  I want to search for: ' + res.bookSearch);

      await books.search(res.bookSearch, options, async function(req, res) {
        var books = res;
        books.map((book, index) => {
          console.log(index + 1 + ":");
          console.log('Title: ' + book.title);
          console.log('Author(s): ' + book.authors);
          console.log('Publisher: ' + book.publisher);
        });
      
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
      });
    });
  } catch (err) {
    console.error(err.message);
  }
}

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