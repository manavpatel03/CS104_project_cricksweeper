import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXku4nVntoNbWFyglGaVCHlvKckL08edc",
  authDomain: "cricketminesweeper.firebaseapp.com",
  databaseURL: "https://cricketminesweeper-default-rtdb.firebaseio.com",
  projectId: "cricketminesweeper",
  storageBucket: "cricketminesweeper.appspot.com",
  messagingSenderId: "368295011381",
  appId: "1:368295011381:web:39f4bd243463049312fd7c",
  measurementId: "G-4065PW7ZE2",
};

initializeApp(firebaseConfig);
var database = getDatabase();

function writeUserData(user, pass) {
  set(ref(database, "users/" + user), {
    username: user,
    password: pass,
  });
}

function readUserData(user, pass) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, "users/" + user))
    .then((snapshot) => {
      if (snapshot.exists() == false) {
        alert("Username does not exist!!!");
      } else if (snapshot.exists()) {
        if (snapshot.val().password == pass) {
          alert("successful!!");
          location.href = "../Single_player_game/index.html";
        } else {
          alert("enter correct password!");
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var use = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    readUserData(use, pass);
  });

document
  .getElementById("signup-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    writeUserData(user, pass);
  });

document.getElementById("user").addEventListener("input", function () {
  localStorage.setItem("user", document.getElementById("user").value);
});

document.getElementById("gridSize").addEventListener("input", function () {
  localStorage.setItem("num", document.getElementById("gridSize").value);
});
