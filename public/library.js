function Book(id, title, author, num_of_pages, isRead) {
    this.id=id;
    this.title=title;
    this.author=author;
    this.num_of_pages=num_of_pages;
    this.isRead=isRead;
}

function addBookToLibrary(title, author, num_of_pages, isRead) {
    if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
        let generateID = new Promise( (resolve, reject) => {
            try{
                myLibraryFirebase.orderBy("createdAt", "desc").limit(1).get().then(querySnapshot => {
                    if(querySnapshot.docs.length == 0){
                        console.log("ID was generated successfully (1).");
                        resolve("1");
                    }else{
                        querySnapshot.docs.map(doc => {
                            console.log("ID was generated successfully (increment).");
                            resolve(String(Number(doc.id) + 1));
                        });
                    }
                }).catch((error) => {console.log(error)});
            }catch(error){
                reject("Error generating an ID.")
            }
        });
        generateID.then( id => {
            if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
                const {serverTimestamp} = firebase.firestore.FieldValue;
                myLibraryFirebase.doc(id).set({ //set document id to book id
                    uid : firebase.auth().currentUser.uid, //user id
                    title : title,
                    author : author,
                    num_of_pages : Number(num_of_pages),
                    isRead : Boolean(isRead),
                    createdAt : serverTimestamp(),
                });
                console.log("Book was added successfully.");
            }
            fetchFireStore();
        }).catch( error => {console.log(error)});
    }else { // No user is signed in.
        let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        let id = Math.max(...myLibrary.map((bookObj) => {return Number(bookObj.id);})) + 1;
        if(id < 1){id=1;}
        console.log(id);
        const new_book = new Book(id, title, author, num_of_pages, isRead);
        myLibrary.push(new_book);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
}

function removeFromLibrary(bookObj){
    if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
        let deleteDocument = new Promise((resolve, reject) => {
            try{
                myLibraryFirebase.doc(bookObj.firstChild.textContent).delete();
                resolve("Book was successfully removed from Firestore.");
            }catch(error){
                reject("Error removing book from Firestore.")
            }
        });
        deleteDocument.then((message) => {
            console.log(message);
            fetchFireStore();
        }).catch( (error) => {console.log(error);});
    }else { // No user is signed in.
        let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id === bookObj.firstChild.textContent)), 1);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
}

function toggleRead(bookObj){
    let new_book = new Book(bookObj.childNodes[0].textContent, bookObj.childNodes[1].textContent, 
        bookObj.childNodes[2].textContent, bookObj.childNodes[3].textContent, (bookObj.childNodes[4].textContent=="false" ? true : false));
    if (localStorage.getItem("isLoggedIn")=="true") {// User is signed in.
        let updateDocument = new Promise((resolve, reject) => {
            try{
                myLibraryFirebase.doc(bookObj.firstChild.textContent).update({isRead : Boolean(new_book["isRead"])});
                resolve("Book was successfully updated in Firestore.");
            }catch(error){
                reject("Error updating book in Firestore.")
            }
        });
        updateDocument.then((message) => {
            console.log(message);
            fetchFireStore();
        }).catch( (error) => {console.log(error);});
    }else { // No user is signed in.
        let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id === bookObj.firstChild.textContent)), 1, new_book);
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
}

function displayBooks_Table(){
    let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    document.querySelector("#table_section").innerHTML = "";
    let table = document.createElement("table");
    table.classList.add("table"); //table classes

    //add table heading
    let headingRow = document.createElement("tr");
    for(let property in new Book(...'')){
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

