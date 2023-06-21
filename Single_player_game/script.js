// Import grid size from another file
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
const name = localStorage.getItem("user");
const n = parseInt(localStorage.num, 10);

function writeUserData(user, scor) {
  set(ref(database, n + "/" + user), {
    score: scor,
  });
}

function readUserData(user) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, n + "/" + user))
    .then((snapshot) => {
      console.log("trial");
      if (snapshot.exists() == false) {
        console.log("for trial");
        writeUserData(name, localStorage.score);
      } else {
        if (parseInt(snapshot.val().score, 10) >= localStorage.score) {
          alert("your previous best was : " + snapshot.val().score);
          console.log(snapshot.val().score);
        } else {
          alert("your new best is : " + localStorage.score);
          writeUserData(name, localStorage.score);
          console.log(snapshot.val().score);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Field name imported from another file

let fielders_num = n * 2;

let free_hit = false;
let double = false;

// Generate the grid
const gridContainer = document.getElementById("grid");
gridContainer.style.width = `${n * 70}px`;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const cell = document.createElement("div");
    cell.className = "cell hidden";
    cell.style.height = "70px";
    cell.id = `(${String(i)},${String(j)})`;
    cell.addEventListener("mousedown", handleCellClick, { capture: true });
    gridContainer.appendChild(cell);
  }
}

while (fielders_num > 0) {
  let x = Math.floor(Math.random() * n);
  let y = Math.floor(Math.random() * n);
  if (
    !document
      .getElementById(`(${String(x)},${String(y)})`)
      .classList.contains("fielder")
  ) {
    fielders_num--;
    const fielderCell = document.getElementById(`(${String(x)},${String(y)})`);
    fielderCell.classList.add("fielder");
    fielderCell.innerHTML = "W";
  }
}
const loadingElement = document.createElement("div");
loadingElement.innerHTML = "Loading...";
loadingElement.style.position = "fixed";
loadingElement.style.top = "50%";
loadingElement.style.left = "50%";
loadingElement.style.transform = "translate(-50%, -50%)";
loadingElement.style.backgroundColor = "white";
loadingElement.style.padding = "20px";
loadingElement.style.borderRadius = "5px";
loadingElement.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const cell = document.getElementById(`(${String(i)},${String(j)})`);
    let runs = Math.floor(Math.random() * 7);
    if (!cell.classList.contains("fielder")) {
      if (runs === 5) {
        let r = Math.floor(Math.random() * 3);
        if (r === 0) {
          cell.classList.add("powerup_0");
          cell.classList.add("p__0");
          cell.classList.add("runs");
          cell.innerHTML = "P";
        } else if (r === 1) {
          cell.classList.add("powerup_1");
          cell.classList.add("p__1");
          cell.classList.add("runs");
          cell.innerHTML = "P";
        } else if (r === 2) {
          cell.classList.add("powerup_2");
          cell.classList.add("p__2");
          cell.classList.add("runs");
          cell.innerHTML = "P";
        }
      } else {
        // cell.innerHTML = `<p>${String(runs)}</p>`;
        cell.innerHTML = `${String(runs)}`;
        cell.classList.add("runs");
        cell.classList.add(`${String(runs)}`);
      }
    }
  }
}

// Set the field name

// Score tracking variables
let score = 0;
let wicketsRemaining = 3;

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent =
    score.toString() + "/" + (3 - wicketsRemaining).toString();
}

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.target;

  // Reveal the cell
  cell.classList.remove("hidden");
  cell.classList.add("visible");

  // Check the cell content
  if (cell.classList.contains("runs")) {
    // Increment score
    if (cell.classList.contains("powerup_0")) {
      alert("FREE HIT!!!");
      free_hit = true;
      double = false;
      cell.classList.remove("powerup_0");
    } else if (cell.classList.contains("powerup_1")) {
      alert("NEXT HIT SCORE X 2 !!");
      double = true;
      free_hit = false;
      cell.classList.remove("powerup_1");
    } else if (cell.classList.contains("powerup_2")) {
      //fielder view
      free_hit = false;
      double = false;
      gridContainer.classList.add("show-fielders");
      setTimeout(() => {
        gridContainer.classList.remove("show-fielders");
      }, 1000);
      cell.classList.remove("powerup_2");
    } else if (cell.classList.contains("1")) {
      if (double) {
        cell.classList.remove("runs");
        score += 2;
        double = false;
      } else {
        score++;
        cell.classList.remove("runs");
      }
      free_hit = false;
      double = false;
      updateScore();
    } else if (cell.classList.contains("2")) {
      if (double) {
        score += 4;
        free_hit = false;
        double = false;
        cell.classList.remove("runs");
      } else {
        score += 2;
        cell.classList.remove("runs");
      }
      free_hit = false;
      double = false;
      updateScore();
    } else if (cell.classList.contains("3")) {
      if (double) {
        score += 6;
        cell.classList.remove("runs");
      } else {
        score += 3;
        cell.classList.remove("runs");
      }
      free_hit = false;
      double = false;
      updateScore();
    } else if (cell.classList.contains("4")) {
      if (double) {
        cell.classList.remove("runs");
        score += 8;
        double = false;
        free_hit = false;
      } else {
        score += 4;
        cell.classList.remove("runs");
      }
      double = false;
      updateScore();
      free_hit = false;
    } else if (cell.classList.contains("6")) {
      if (double) {
        cell.classList.remove("runs");
        score += 12;
        double = false;
        free_hit = false;
      } else {
        score += 6;
        cell.classList.remove("runs");
      }
      double = false;
      free_hit = false;
      updateScore();
    }
  } else if (cell.classList.contains("fielder")) {
    if (free_hit) {
      free_hit = false;
    }
    // Decrement wickets remaining
    else {
      wicketsRemaining--;
      updateScore();
      if (wicketsRemaining === 0) {
        // Game over, show score
        cell.classList.remove("hidden");
        localStorage.setItem("score", score);
        readUserData(name);
        alert("Game Over! Final Score: " + score);
        document.body.appendChild(loadingElement);
        setTimeout(() => {
          location.href = "../Leaderboard/index.html";
        }, 5000);
      } else {
        alert("out!! " + String(wicketsRemaining) + " wickets remain!!");
      }
    }
    double = false;
  }
  // Disable further clicks on the cell
  cell.removeEventListener("click", handleCellClick);
}
