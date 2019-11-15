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

const readingList = [];

menu();

function menu(){
  
  prompt.start(
    console.log("Enter 'search' to search and add books to your reading list; Enter 'print' to print your reading list.")
  );
  prompt.get(['answer'], async function (error, res) {
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

    prompt.get(['bookSearch'], async function (err, res) {
      console.log('I want to search for: ' + res.bookSearch);
    
      const results = await books.search(res.bookSearch, options, function(error, results) {
        if ( ! error ) {
          results.map((book, index) => {
            console.log(index + 1 + ":");
            console.log('Title: ' + book.title);
            console.log('Author(s): ' + book.authors);
            console.log('Publisher: ' + book.publisher);
          });
          
          prompt.get(['index'], async function (error, res) {

            var int = parseInt(res.index);
          
            console.log("You entered: " + int);
              if (int <= 5) {
                const chosenBook = await results[int]
                readingList.push(chosenBook);
                printList();
              } else if (res.index === 'exit') {
                console.log('goodbye!');
                process.exit();
              } else {
                console.log('Please choose 1-5');
                // choose()
                ['index']
              }
            });

        } else {
            console.log(error);
        }
      });
    });
    
  } catch (err) {
    console.error(err.message);
  }
}
      
// async function choose(){
      
//   prompt.get(['index'], async function (error, res) {

//   var int = parseInt(res.index);

//   console.log("You entered: " + int);
//     if (int <= 5) {
//       const chosenBook = await search()
//       readingList.push(chosenBook);
//       printList();
//     } else if (res.index === 'exit') {
//       console.log('goodbye!');
//       process.exit();
//     } else {
//       console.log('Please choose 1-5');
//       choose()
//     }
//   });
// }

const printList = () => {
  if (readingList.length > 0) {
    console.log("Your reading list currently includes: ");
    readingList.map((book, index) => {
      console.log(index + 1 + ". " + "Title: " + book.title);

    });
    menu();
  } else {
    console.log("Your reading list is currently empty. Search and select books to add.");
    search();
  }
}