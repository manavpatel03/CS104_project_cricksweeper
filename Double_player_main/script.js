const gridContainer = document.getElementById("grid");
gridContainer.style.width = `${7 * 70}px`;

for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    const cell = document.createElement("div");
    cell.className = "cell hidden";
    cell.style.height = "70px";
    cell.id = `(${String(i)},${String(j)})`;
    cell.addEventListener("mousedown", handleCellClick, { capture: true });
    gridContainer.appendChild(cell);
  }
}
