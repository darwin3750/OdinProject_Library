//add "add book" modal form
    const modal = document.createElement("div");
    modal.setAttribute("id", "addBookModal");
    modal.classList.add("modal");
    modal.textContent = "Modal Test";

    const modal_content = document.createElement("div");
    modal_content

    document.querySelector("#main").appendChild(modal);

//add "add book" button
    const button = document.createElement("button");
    button.setAttribute("id", "addBookButton");
    button.textContent = "Add Book";

    //add to html
    document.querySelector("#main").appendChild(button);

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