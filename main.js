// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart");
    const xScoreElement = document.getElementById("x-score");
    const oScoreElement = document.getElementById("o-score");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let xScore = 0;
    let oScore = 0;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (gameBoard[index] !== "" || checkWinner()) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            updateScore(currentPlayer);
            return;
        } else if (gameBoard.every(cell => cell !== "")) {
            alert("It's a draw!");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") {
            computerPlay();
        }
    }

    function computerPlay() {
        let availableCells = gameBoard.map((value, index) => value === "" ? index : null).filter(value => value !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        gameBoard[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            updateScore(currentPlayer);
        } else if (gameBoard.every(cell => cell !== "")) {
            alert("It's a draw!");
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function updateScore(player) {
        if (player === "X") {
            xScore++;
            xScoreElement.textContent = xScore;
        } else {
            oScore++;
            oScoreElement.textContent = oScore;
        }
    }

    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
    }
});
