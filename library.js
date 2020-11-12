let myLibrary = [];

function Book(title, author, num_of_pages, isRead) {
  // the constructor...
  this.title=title;
  this.author=author;
  this.num_of_pages=num_of_pages;
  this.isRead=isRead;
}

function addBookToLibrary(title, author, num_of_pages, isRead) {
  const new_book = new Book(title, author, num_of_pages, isRead);
  myLibrary.push(new_book);
}

function viewBooks(){
    myLibrary.forEach((val)=>{console.log(val)})
}

//add books
addBookToLibrary("title", "author", 3, false);
addBookToLibrary("title", "author", 3, false);
addBookToLibrary("title", "author", 3, false);
addBookToLibrary("title", "author", 3, false);

//put books in table
    let table = document.createElement("table");
    table.classList.add("table"); //table classes

    //add table heading
    let headingRow = document.createElement("tr");
    for(let property in myLibrary[0]){
        let th = document.createElement("th");
        th.textContent = property;
        headingRow.appendChild(th);
    }
    table.appendChild(headingRow);

    //add table row content
    for(let i=0; i<myLibrary.length; i++){
        let tr = document.createElement("tr");
        for(let property in myLibrary[i]){
            let td = document.createElement("td");
            td.textContent = myLibrary[i][property];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    //add table to HTML
    document.querySelector("#main").appendChild(table);
