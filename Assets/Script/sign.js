// var firebaseConfig = {
//     apiKey: "AIzaSyB6Q9ucZ_aMSCoZSAeJFnYe7epxSK7WP8w",
//     authDomain: "dine-in-0416.firebaseapp.com",
//     projectId: "dine-in-0416",
//     storageBucket: "dine-in-0416.appspot.com",
//     messagingSenderId: "105397111835",
//     appId: "1:105397111835:web:a7ac7f70307adee53cfcbe"
// };
// firebase.initializeApp(firebaseConfig);


var provider = new firebase.auth.GoogleAuthProvider();

function Signin() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user;
        // var userDetails = document.getElementById('user-details');
        // userDetails.innerHTML = 'Hello, ' + user.displayName + '!';
        window.location.href = "Assets/slide.html";

    }).catch(function (error) {
        console.log(error.code, error.message)
    });
}