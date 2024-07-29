document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("tic-tac-toe-board");
  const cells = document.querySelectorAll("[data-cell]");
  const message = document.getElementById("game-message");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = document.querySelector(".close");

  let turn = "X";
  let boardState = ["", "", "", "", "", "", "", "", ""];
  let gameOver = false;

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (gameOver) return;

      const index = Array.from(cells).indexOf(cell);

      if (boardState[index] || checkWinner()) return;

      boardState[index] = turn;
      cell.textContent = turn;
      cell.classList.add(turn.toLowerCase());

      if (checkWinner()) {
        message.textContent = "";
        showModal(
          `You beat the computer! Now, let's beat the competition by taking this webinar!🏆😉😎`
        );
        gameOver = true;
        return;
      }

      if (!boardState.includes("")) {
        message.textContent = "It's a Draw!";
        showModal("It's a Draw! Try Again!");
        gameOver = true;
        return;
      }

      turn = turn === "X" ? "O" : "X";
      computerPlay();
    });
  });

  function computerPlay() {
    if (turn === "X" || gameOver) return;

    const available = boardState
      .map((val, index) => (val === "" ? index : null))
      .filter((val) => val !== null);
    const randomIndex = available[Math.floor(Math.random() * available.length)];

    boardState[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    cells[randomIndex].classList.add("o");

    if (checkWinner()) {
      message.textContent = "";
      showModal("Computer Wins! Try Again!");
      gameOver = true;
      return;
    }

    if (!boardState.includes("")) {
      message.textContent = "It's a Draw!";
      showModal("It's a Draw! Try Again!");
      gameOver = true;
    }

    turn = "X";
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function showModal(messageText) {
    modalMessage.textContent = messageText;
    modal.style.display = "flex";
  }

  closeBtn.onclick = function () {
    modal.style.display = "none";
    resetGame();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      resetGame();
    }
  };

  function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    turn = "X";
    gameOver = false;
  }
});
