const gridContainer = document.getElementById("grid");
gridContainer.style.width = "32vw";
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    const cell = document.createElement("div");
    cell.className = "cell hidden";
    cell.style.height = "70px";
    cell.id = `(${String(i)},${String(j)})`;
    gridContainer.appendChild(cell);
  }
}
const cells = document.getElementsByClassName("cell");
const flow = document.getElementById("flow");
let p1 = false;
let toss = Math.random();
if (toss > 0.5) {
  p1 = true;
  flow.textContent = localStorage.getItem("p1") + " wins the toss!";
} else {
  flow.textContent = localStorage.getItem("p2") + " wins the toss!";
}

let fielders_num = 14;
let batsman = "";
let p1_score = 0;
let p2_score = 0;
let wickets_p1 = 3;
let wickets_p2 = 3;
let bowler = "";
document.getElementById("bat").addEventListener("click", () => {
  if (p1) {
    batsman = localStorage.getItem("p1");
    bowler = localStorage.getItem("p2");
  } else {
    batsman = localStorage.getItem("p2");
    bowler = localStorage.getItem("p1");
  }
  document.getElementById("form").remove();
  document.getElementById("flow").remove();
  alert(bowler + "! select the 14 fielders!!!");
  function fielderClickHandler(event) {
    const selectedCell = event.target;
    selectedCell.classList.add("fielder");
    selectedCell.innerHTML = "W";

    fielders_num--;
    selectedCell.classList.remove("hidden");
    selectedCell.removeEventListener("mousedown", fielderClickHandler, {
      capture: true,
    });

    if (fielders_num === 0) {
      Array.from(cells).forEach(function (cell) {
        cell.removeEventListener("mousedown", fielderClickHandler, {
          capture: true,
        });
      });
      addeventp1();
    }
  }

  Array.from(cells).forEach(function (cell) {
    cell.addEventListener("mousedown", fielderClickHandler, {
      capture: true,
    });
  });
});
document.getElementById("bowl").addEventListener(
  "click",
  () => {
    if (p1) {
      batsman = localStorage.getItem("p2");
      bowler = localStorage.getItem("p1");
    } else {
      batsman = localStorage.getItem("p1");
      bowler = localStorage.getItem("p2");
    }
    document.getElementById("form").remove();
    document.getElementById("flow").remove();
    alert(bowler + "! select the 14 fielders!!!");
    function fielderClickHandler(event) {
      const selectedCell = event.target;
      selectedCell.classList.add("fielder");
      selectedCell.innerHTML = "W";
      fielders_num--;
      selectedCell.classList.remove("hidden");
      selectedCell.removeEventListener("mousedown", fielderClickHandler, {
        capture: true,
      });

      if (fielders_num === 0) {
        Array.from(cells).forEach(function (cell) {
          cell.removeEventListener("mousedown", fielderClickHandler, {
            capture: true,
          });
        });
        addeventp1();
      }
    }

    Array.from(cells).forEach(function (cell) {
      cell.addEventListener("mousedown", fielderClickHandler, {
        capture: true,
      });
    });
  },
  { capture: true }
);
function updateScore_p1() {
  const scoreElement = document.getElementById("score_p1");
  scoreElement.textContent =
    batsman + " : " + p1_score.toString() + "/" + (3 - wickets_p1).toString();
}

function updateScore_p2() {
  const scoreElement = document.getElementById("score_p2");
  scoreElement.textContent =
    bowler + " : " + p2_score.toString() + "/" + (3 - wickets_p2).toString();
}
function handleCellClick_p1(event) {
  const cell = event.target;

  // Reveal the cell
  cell.classList.remove("hidden");
  cell.classList.add("visible");

  // Check the cell content
  if (cell.classList.contains("runs")) {
    // Increment score
    if (cell.classList.contains("1")) {
      p1_score++;
      cell.classList.remove("runs");
      updateScore_p1();
    } else if (cell.classList.contains("2")) {
      p1_score += 2;
      cell.classList.remove("runs");

      updateScore_p1();
    } else if (cell.classList.contains("3")) {
      p1_score += 3;
      cell.classList.remove("runs");

      updateScore_p1();
    } else if (cell.classList.contains("4")) {
      p1_score += 4;
      cell.classList.remove("runs");
      updateScore_p1();
    } else if (cell.classList.contains("6")) {
      p1_score += 6;
      cell.classList.remove("runs");

      updateScore_p1();
    }
  } else if (cell.classList.contains("fielder")) {
    // Decrement wickets remaining

    wickets_p1--;
    updateScore_p1();
    if (wickets_p1 === 0) {
      // Game over, show score
      cell.classList.remove("hidden");
      localStorage.setItem("score_p1", p1_score);
      alert("Out! Now its your turn to bat " + bowler + "!!");
      alert(batsman + "!! Set the field!!");
      fielders_num = 14;
      addeventp2();
      // alert("Game Over! Final Score: " + score);
    } else {
      alert("out!! " + String(wickets_p1) + " wickets remain!!");
    }
  }
  // Disable further clicks on the cell
  cell.removeEventListener("mousedown", handleCellClick_p1, { capture: true });
}
function handleCellClick_p2(event) {
  const cell = event.target;
  // Reveal the cell
  cell.classList.remove("hidden");
  cell.classList.add("visible");

  // Check the cell content
  if (cell.classList.contains("runs")) {
    // Increment score
    if (cell.classList.contains("1")) {
      p2_score++;
      cell.classList.remove("runs");
      updateScore_p2();
      console.log("done");
      console.log("done");
    } else if (cell.classList.contains("2")) {
      p2_score += 2;
      cell.classList.remove("runs");

      updateScore_p2();
      console.log("done");
    } else if (cell.classList.contains("3")) {
      p2_score += 3;
      cell.classList.remove("runs");

      updateScore_p2();
      console.log("done");
    } else if (cell.classList.contains("4")) {
      p2_score += 4;
      cell.classList.remove("runs");
      updateScore_p2();
      console.log("done");
    } else if (cell.classList.contains("6")) {
      p2_score += 6;
      cell.classList.remove("runs");

      updateScore_p2();
      console.log("done");
    }
  } else if (cell.classList.contains("fielder")) {
    // Decrement wickets remaining

    wickets_p2--;
    cell.classList.remove("visible");
    updateScore_p2();
    console.log("done");
    if (wickets_p2 === 0) {
      // Game over, show score
      cell.classList.remove("hidden");
      localStorage.setItem("score_p2", p2_score);
      if (p2_score > p1_score) alert(bowler + " wins!!!");
      else if (p2_score < p1_score) alert(batsman + " wins!!!");
      else alert("tie!!!");
      // alert("Game Over! Final Score: " + score);
    } else {
      alert("out!! " + String(wickets_p2) + " wickets remain!!");
    }
  }
  // Disable further clicks on the cell
  cell.removeEventListener("click", handleCellClick_p2);
}

function addeventp1() {
  Array.from(cells).forEach(function (cell) {
    cell.classList.add("hidden");
    cell.classList.remove("visible");
    let runs = Math.floor(7 * Math.random());
    while (runs == 5) {
      runs = Math.floor(7 * Math.random());
    }
    if (!cell.classList.contains("fielder")) {
      cell.innerHTML = `${String(runs)}`;
      cell.classList.add("runs");
      cell.classList.add(`${String(runs)}`);
    }
    cell.addEventListener("mousedown", handleCellClick_p1, { capture: true });
  });
}
function addeventp2() {
  Array.from(document.getElementsByClassName("cell")).forEach(function (x) {
    x.removeEventListener("mousedown", handleCellClick_p1, {
      capture: true,
    });
    x.classList.remove("fielder");
    x.classList.remove("runs");
    x.classList.remove("visible");
    for (let i = 0; i < 7; i++) {
      x.classList.remove(i.toString());
    }
    x.classList.add("hidden"); // Remove the "hidden" class
    x.innerHTML = "";
  });

  function fielderClickHandler(event) {
    const selectedCell = event.target;
    selectedCell.classList.add("fielder");
    selectedCell.innerHTML = "W";
    fielders_num--;
    selectedCell.classList.remove("hidden");

    if (fielders_num === 0) {
      Array.from(cells).forEach(function (cell) {
        cell.removeEventListener("mousedown", fielderClickHandler, {
          capture: true,
        });
      });
      part2();
    }
  }
  Array.from(cells).forEach(function (cell) {
    cell.addEventListener("mousedown", fielderClickHandler, {
      capture: true,
    });
  });
}
function part2() {
  Array.from(cells).forEach(function (cell) {
    cell.classList.add("hidden");
    let runs = Math.floor(7 * Math.random());
    while (runs == 5) {
      runs = Math.floor(7 * Math.random());
    }
    if (!cell.classList.contains("fielder")) {
      cell.innerHTML = `${String(runs)}`;
      cell.classList.add("runs");
      cell.classList.add(`${String(runs)}`);
    }
    cell.addEventListener("mousedown", handleCellClick_p2, {
      capture: true,
    });
  });
}
