/*document.getElementById("login").addEventListener("click", function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {//callback
    if (user) {
      console.log(user);
      window.location="views/principal.html";
      //console.log("loguedo");
      //console.log(user);
    }else{
      console.log("desloguedo");
    }
  });

$("#login1").click(function(){
    console.log("Boton login clickeado");
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error){
      console.log(error);
      alert(error.message);
    });
  });


  $("#signup").click(function(){
    console.log("Boton signup clickeado");
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error){
    console.log(error);
    alert(error.message);
    });
  });

  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      console.log("logged in");
      $("#user").text(user.email);
      console.log(user);
      window.location = "views/principal.html";
    }else{
      console.log("logged out");
      $("#user").text("");
    }
  });
*/
$(document).ready(function () {

    setTimeout(function () {
        $('#splash').hide(500);
        $('.bg-login').removeClass('hide');
    }, 2000);

    $('.modal').modal();
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
//USANDO FIREBASE PARA INICIAR SESION

// Initialize Firebase
var config = {
  apiKey: "AIzaSyASkwROebckBu2yW6srOPlmpiks8C11TgM",
  authDomain: "festivalon-fa3c0.firebaseapp.com",
  databaseURL: "https://festivalon-fa3c0.firebaseio.com",
  projectId: "festivalon-fa3c0",
  storageBucket: "",
  messagingSenderId: "76448080174"
};
firebase.initializeApp(config);

  var userEmail=document.getElementById("email");
  var password=document.getElementById("password");
  var btnLogin=document.getElementById("login1");
  var btnSignUp=document.getElementById("signup");
  var newEmail=document.getElementById("new-email");
  var newPassword=document.getElementById("new-password");

  //Creando un evento para el boton de login
  btnLogin.addEventListener("click", e => {
      var userEmailValue=userEmail.value;
      var passwordValue=password.value;
      var auth=firebase.auth();
      var promise=auth.signInWithEmailAndPassword(userEmailValue,passwordValue);
      promise.catch( e => alert(e.message));
  });
  btnSignUp.addEventListener("click", e => {
    var userEmailValue=newEmail.value;
    var passwordValue=newPassword.value;
    var auth=firebase.auth();
    var promise=auth.createUserWithEmailAndPassword(userEmailValue,passwordValue);
    promise.catch( e => alert(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log("logeado");
            location.href="views/principal.html"
        }else{
            console.log("not loged in");
        }
    });
