let myLibrary = [];

function Book(id, title, author, num_of_pages, isRead) {
  this.id=id;
  this.title=title;
  this.author=author;
  this.num_of_pages=num_of_pages;
  this.isRead=isRead;
}

function addBookToLibrary(id, title, author, num_of_pages, isRead) {
  const new_book = new Book(id, title, author, num_of_pages, isRead);
  myLibrary.push(new_book);
}

function viewBooks(){
    myLibrary.forEach((val)=>{console.log(val)})
}

//add books
addBookToLibrary("1", "titleA", "author", 3, false);
addBookToLibrary("2", "titleB", "author", 3, false);
addBookToLibrary("3", "titleC", "author", 3, false);
addBookToLibrary("4", "titleD", "author", 3, false);

//put books in table
function insertBooksTable(){
    document.querySelector("#table_section").innerHTML = "";
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
    for(let i=0; i<myLibrary.length; i++){ //loop through myLibrary
        let tr = document.createElement("tr");
        for(let property in myLibrary[i]){ //loop through columns
            let td = document.createElement("td");
            td.textContent = myLibrary[i][property];
            tr.appendChild(td);
        }
        //delete button
        const delete_button = document.createElement("button");
        let td = document.createElement("td");
        delete_button.textContent = "Delete";
        delete_button.classList.add("btn", "btn-danger", "delete_button")
        td.appendChild(delete_button);
        tr.appendChild(td);
        //toggle read button
        const read_button = document.createElement("button");
        td = document.createElement("td");
        read_button.textContent = "Toggle Read";
        read_button.classList.add("btn", "btn-info", "read_button")
        td.appendChild(read_button);
        tr.appendChild(td);

        table.appendChild(tr);
    }

    //add table to HTML
    document.querySelector("#table_section").appendChild(table);
    setListeners();
}

//Listeners
function setListeners(){
    let delete_buttons = document.querySelectorAll(".delete_button");
    let read_buttons = document.querySelectorAll(".read_button");
    delete_buttons = Array.from(delete_buttons);
    read_buttons = Array.from(read_buttons);
    for(let i=0; i<delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', (e)=>{
            myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id === e.target.parentNode.parentNode.firstChild.textContent)), 1)
            insertBooksTable();
        });
        read_buttons[i].addEventListener('click', (e)=>{
            myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id === (obj=e.target.parentNode.parentNode).firstChild.textContent)), 1, 
                    new Book(obj.childNodes[0].textContent, obj.childNodes[1].textContent, obj.childNodes[2].textContent, obj.childNodes[3].textContent, (obj.childNodes[4].textContent=="false" ? true : false)));
            insertBooksTable();
        });
    }
}

insertBooksTable();