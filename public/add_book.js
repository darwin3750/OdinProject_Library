

let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

//add "add book" modal form
    //the modal
    const modal = document.createElement("div");
    modal.setAttribute("id", "addBookModal");
    modal.classList.add("modal");

    const modal_content = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.textContent = "Add Book"
    modal_content.appendChild(h1);
    modal_content.classList.add("modal-content");
    modal.appendChild(modal_content);

    //the form
    const form = document.createElement("form");
    form.setAttribute("name", "addBookForm");
    form.setAttribute("action", "#");
    form.setAttribute("onsubmit", 'addBookToLibrary(document.forms["addBookForm"][0].value, document.forms["addBookForm"][1].value, document.forms["addBookForm"][2].value, document.forms["addBookForm"][3].value);displayBooks_Table();');
    for(let property in new Book(...'')){
        if (property == "id"){continue;}
        let label = document.createElement("label");
        let input;
        label.setAttribute("for", property);
        label.textContent = property;
        if (property == "isRead") {
            input = document.createElement("select");
            input.setAttribute("id", property);
            let option_true = document.createElement("option");
            option_true.setAttribute("value", true);
            option_true.textContent = "true";
            input.appendChild(option_true) ;
            let option_false = document.createElement("option");
            option_false.setAttribute("value", false);
            option_false.textContent = "false";
            input.appendChild(option_false) ;
        }else{
            input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", property);
        }
        form.appendChild(label);
        form.appendChild(document.createElement("br"));
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
    }
    //form submit button
    const form_button = document.createElement("input");
    form_button.setAttribute("type", "submit");
    form_button.setAttribute("id", "form_submit");
    form_button.setAttribute("value", "Submit");
    form.appendChild(form_button);

    modal_content.appendChild(form);

    //put in html
    document.querySelector("#main").appendChild(modal);

    //styles
    for(form_fields of document.querySelectorAll("input")){
        form_fields.classList.add("form-control");
    }
    document.querySelector("#isRead").classList.add("form-control");
    document.querySelector("#form_submit").classList.add("btn", "btn-success");

//add "add book" button
    const button = document.createElement("button");
    button.setAttribute("id", "addBookButton");
    button.textContent = "Add Book";
    button.classList.add("btn", "btn-block", "btn-primary", "mb-2", "mt-2") //button classes

    //add to html
    document.querySelector("#button_section").appendChild(button);

//Listeners
    //button click listener to open modal
    const addBookButton = document.querySelector("#addBookButton");
    addBookButton.addEventListener('click', () => {
        document.querySelector("#addBookModal").classList.add("d-block");
    });

    //window click listener to close modal
    window.addEventListener('click', (e) => {
        let modal = document.querySelector("#addBookModal");
        if(e.target == modal){
            modal.classList.remove("d-block");
        }
    });
