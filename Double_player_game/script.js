document.getElementById("submit").addEventListener("click", function () {
  let x = document.getElementById("player1").value;
  let y = document.getElementById("player2").value;
  localStorage.setItem("p1", x);
  localStorage.setItem("p2", y);
  location.href = "../Double_player_main/index.html";
});
