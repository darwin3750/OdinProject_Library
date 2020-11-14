function Book(id, title, author, num_of_pages, isRead) {
    this.id=id;
    this.title=title;
    this.author=author;
    this.num_of_pages=num_of_pages;
    this.isRead=isRead;
}

function setLibrary(myLibrary){
    if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
        console.log(
            myLibraryFirebase.add({
                Book : JSON.stringify(myLibrary.slice(-1).pop())
            })
        );
        
    } else { // No user is signed in.
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
}

function getLibrary(){
    let myLibrary=[];
    if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
        // get from firebase
        myLibraryFirebase.onSnapshot(querySnapshot => {
            const books = querySnapshot.docs.map(doc => {
                return JSON.parse(doc.data().Book)
            })
            myLibrary.push(books);
            //console.log(books);
            console.log(myLibrary);
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary[0]));
        });

        //return myLibrary;
    }
    return JSON.parse(localStorage.getItem("myLibrary"));

}

function addBookToLibrary(id, title, author, num_of_pages, isRead) {
    let myLibrary = getLibrary();
    const new_book = new Book(id, title, author, num_of_pages, isRead);
    //check if id exists
    var exists = false;
    for(var i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == new_book.id) {
            exists = true;
            console.log("ID is already taken.");
            break;
        }
    }
    if(!exists){
        myLibrary.push(new_book);
        setLibrary(myLibrary);
    }
}

function removeFromLibrary(bookObj){
    let myLibrary = getLibrary();
    myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id === bookObj.firstChild.textContent)), 1);
    setLibrary(myLibrary);
}

function toggleRead(bookObj){
    let myLibrary = getLibrary();
    myLibrary.splice(  
        myLibrary.indexOf(
            myLibrary.find(book => book.id === bookObj.firstChild.textContent)
        ), 
        1, 
        new Book(bookObj.childNodes[0].textContent, 
            bookObj.childNodes[1].textContent, 
            bookObj.childNodes[2].textContent, 
            bookObj.childNodes[3].textContent, 
            (bookObj.childNodes[4].textContent=="false" ? true : false)
        )
    );
    setLibrary(myLibrary);
}

function displayBooks_Table(){
    let myLibrary = getLibrary();
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

function setListeners(){
    let delete_buttons = document.querySelectorAll(".delete_button");
    let read_buttons = document.querySelectorAll(".read_button");
    delete_buttons = Array.from(delete_buttons);
    read_buttons = Array.from(read_buttons);
    for(let i=0; i<delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', (e)=>{
            bookObj = e.target.parentNode.parentNode;
            removeFromLibrary(bookObj);
            displayBooks_Table();
        });
        read_buttons[i].addEventListener('click', (e)=>{
            bookObj = e.target.parentNode.parentNode;
            toggleRead(bookObj);
            displayBooks_Table();
        });
    }
}

//initialize local storage
if(localStorage.getItem("myLibrary") == null){
    let myLibrary = [];
    myLibrary.push(new Book("1", "titleA", "author", 3, false));
    myLibrary.push(new Book("2", "titleB", "author", 3, false));
    myLibrary.push(new Book("3", "titleC", "author", 3, false));
    myLibrary.push(new Book("4", "titleD", "author", 3, false));
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}