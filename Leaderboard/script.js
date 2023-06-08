// Sample object with user scores
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
let userScores = {};
const n = parseInt(localStorage.num, 10);

function readUserData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, n + "/"))
    .then((snapshot) => {
      if (snapshot.exists() == false) {
        alert("ERROR!!\n PLEASE TRY AGAIN LATER");
      } else if (snapshot.exists()) {
        userScores = snapshot.val();
        console.log(userScores);
      }
    })
    .then(() => {
      console.log(userScores);
      // Sort the user scores in descending order
      const sortedScores = Object.entries(userScores).sort(
        (a, b) => parseInt(b[1].score, 10) - parseInt(a[1].score, 10)
      );

      // Display the top five users with the highest scores
      const userScoresContainer = document.getElementById("userScores");

      for (let i = 0; i < Math.min(sortedScores.length, 5); i++) {
        const user = sortedScores[i][0];
        const score = sortedScores[i][1].score;

        const userDiv = document.createElement("div");
        userDiv.className = "user";

        const usernameDiv = document.createElement("div");
        usernameDiv.className = "username";
        usernameDiv.textContent = user;

        const scoreDiv = document.createElement("div");
        scoreDiv.className = "score";
        scoreDiv.textContent = `Score: ${score}`;

        userDiv.appendChild(usernameDiv);
        userDiv.appendChild(scoreDiv);

        userScoresContainer.appendChild(userDiv);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
readUserData();
