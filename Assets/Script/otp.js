console.clear();

// var firebaseConfig = {
//     apiKey: "AIzaSyB6Q9ucZ_aMSCoZSAeJFnYe7epxSK7WP8w",
//     authDomain: "dine-in-0416.firebaseapp.com",
//     projectId: "dine-in-0416",
//     storageBucket: "dine-in-0416.appspot.com",
//     messagingSenderId: "105397111835",
//     appId: "1:105397111835:web:a7ac7f70307adee53cfcbe"
// };
// firebase.initializeApp(firebaseConfig);

window.onload = function () {
    render();
};

function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha');
    recaptchaVerifier.render();
}

function phoneAuth() {
    var number = document.getElementById('number').value;
    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
        console.log(coderesult);
        alert("Message Sent!");
    }).catch(function (error) {
        alert(error.message);
    });
}

function codeverify() {
    var code = document.getElementById('otp').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully Registered");
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        alert(error.message);
    });
}
