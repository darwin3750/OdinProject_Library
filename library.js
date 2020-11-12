let myLibrary = [];

function Book(title, author) {
  // the constructor...
  this.title=title;
  this.author=author;
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}