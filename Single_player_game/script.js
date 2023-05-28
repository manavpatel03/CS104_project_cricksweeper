// Import grid size from another file

const n = parseInt(localStorage.num, 10);

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

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const cell = document.getElementById(`(${String(i)},${String(j)})`);
    let runs = Math.floor(Math.random() * 7);
    if (!cell.classList.contains("fielder")) {
      if (runs === 5) {
        let r = Math.floor(Math.random() * 3);
        if (r === 0) {
          cell.classList.add("powerup_0");
          cell.classList.add("runs");
          cell.innerHTML = "P";
        } else if (r === 1) {
          cell.classList.add("powerup_1");
          cell.classList.add("runs");
          cell.innerHTML = "P";
        } else if (r === 2) {
          cell.classList.add("powerup_2");
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
        alert("Game Over! Final Score: " + score);
      } else {
        alert("out!! " + String(wicketsRemaining) + " wickets remain!!");
      }
    }
    double = false;
  }
  // Disable further clicks on the cell
  cell.removeEventListener("click", handleCellClick);
}
