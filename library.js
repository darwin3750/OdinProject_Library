let myLibrary = ["test1", "test2"];

function Book(title, author) {
  // the constructor...
  this.title=title;
  this.author=author;
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}

function viewBooks(){
    myLibrary.forEach((val)=>{console.log(val)})
}


//write to HTML

viewBooks();