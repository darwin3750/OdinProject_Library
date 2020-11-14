const auth = firebase.auth(); 

const signInButton = document.querySelector("#sign_in_buttton");
const signOutButton = document.querySelector("#sign_out_buttton");

const currentUser = document.querySelector("#current_user");

const signInServiceProvider_Google = new firebase.auth.GoogleAuthProvider();

signInButton.addEventListener("click", () => auth.signInWithPopup(signInServiceProvider_Google));
signOutButton.addEventListener("click", () => auth.signOut());

let myLibraryFirebase;
let unsubscribe;

auth.onAuthStateChanged(user => {
    if(user){
        //signed in 
        signInButton.hidden = true;
        signOutButton.hidden = false;
        currentUser.textContent = user.displayName;
        localStorage.setItem("isLoggedIn", true);
        myLibraryFirebase = firebase.firestore().collection("Library_Books");
        console.log("finished authenticating");
        displayBooks_Table();
    }else{
        //signed out
        signInButton.hidden = false;
        signOutButton.hidden = true;
        currentUser.textContent = "Guest";
        localStorage.setItem("isLoggedIn", false);
        displayBooks_Table();
    }
});
