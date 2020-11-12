//add "add book" modal form

    //the modal
    const modal = document.createElement("div");
    modal.setAttribute("id", "addBookModal");
    modal.classList.add("modal");

    const modal_content = document.createElement("div");
    modal_content.textContent = "Modal Test";
    modal_content.classList.add("modal-content");
    modal.appendChild(modal_content);

    //the form
    const form = document.createElement("form");
    for(let property in myLibrary[0]){
        let label = document.createElement("label");
        label.setAttribute("for", property);
        label.textContent = property;
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", property);
        form.appendChild(label);
        form.appendChild(document.createElement("br"));
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
    }
    //form submit button
    const form_button = document.createElement("input");
    form_button.setAttribute("type", "submit");
    form_button.setAttribute("value", "Submit");
    form.appendChild(form_button);

    modal_content.appendChild(form);

    //the submit button

    //put in html
    document.querySelector("#main").appendChild(modal);

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