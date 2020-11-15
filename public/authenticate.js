const auth = firebase.auth(); 

const signInButton = document.querySelector("#sign_in_buttton");
const signOutButton = document.querySelector("#sign_out_buttton");

const currentUser = document.querySelector("#current_user");

const signInServiceProvider_Google = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener("click", () => auth.signInWithPopup(signInServiceProvider_Google));
signOutButton.addEventListener("click", () => auth.signOut());

let myLibraryFirebase;

//define fetchFireStore here
function fetchFireStore(){
    p = new Promise( (resolve) => {
        // get from firebase
        console.log(myLibraryFirebase);
        myLibraryFirebase.where("uid", "==", firebase.auth().currentUser.uid).get().then(querySnapshot => {
            myLibrary = querySnapshot.docs.map(doc => {
                return new Book(doc.id, doc.data().title, doc.data().author, doc.data().num_of_pages, doc.data().isRead);
            })
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
            resolve("Success");
        });
    });

    console.log("finished authenticating");
    p.then(() => {displayBooks_Table()});
}

auth.onAuthStateChanged(user => {
    let myLibrary=[];
    if(user){
        //signed in 
        signInButton.hidden = true;
        signOutButton.hidden = false;
        currentUser.textContent = user.displayName;
        localStorage.setItem("isLoggedIn", true);
        myLibraryFirebase = firebase.firestore().collection("Library_Books");

        fetchFireStore();
    }else{
        //signed out
        signInButton.hidden = false;
        signOutButton.hidden = true;
        currentUser.textContent = "Guest";
        localStorage.setItem("isLoggedIn", false);
        //initialize local storage
        //if(localStorage.getItem("myLibrary") == null){

            myLibrary.push(new Book("1", "titleA", "author", 3, false));
            myLibrary.push(new Book("2", "titleB", "author", 3, false));
            myLibrary.push(new Book("3", "titleC", "author", 3, false));
            myLibrary.push(new Book("4", "titleD", "author", 3, false));
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        //}
        console.log("finished authenticating no user");
        displayBooks_Table();
    }
});
