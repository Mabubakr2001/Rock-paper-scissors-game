const userScoreSpot = document.querySelector(".user-score");
const compScoreSpot = document.querySelector(".comp-score");
const gameHint = document.querySelector(".game-hint");
const userGuessesElements = document.querySelectorAll(".user-guess");
const btnResetGame = document.querySelector(".btn-reset");

const allGuesses = ["rock", "paper", "scissors"];
const finalScore = 20;

let userScore = 0;
let compScore = 0;
let isGameOver = false;

function addStateDataAttribute(gameState, guess) {
  userGuessesElements.forEach((guessElement) => {
    if (guessElement.dataset.userGuess === guess)
      guessElement.dataset.state = gameState;
    setTimeout(() => {
      guessElement.dataset.state = "";
    }, 250);
  });
}

function manipulateTheGame(gameState, userGuess, compGuess) {
  if (isGameOver) return;

  let hintMessage;
  if (gameState === "win") {
    userScore++;
    userScoreSpot.textContent = userScore;
    hintMessage = `User guess (${userGuess}), comp guess (${compGuess}). You get it!`;
  }

  if (gameState === "lose") {
    compScore++;
    compScoreSpot.textContent = compScore;
    hintMessage = `User guess (${userGuess}), comp guess (${compGuess}). The comp get it!`;
  }

  if (userScore === finalScore) {
    isGameOver = true;
    userScoreSpot.textContent = userScore;
    hintMessage = "Game Over. You Win!";
  }

  if (compScore === finalScore) {
    isGameOver = true;
    compScoreSpot.textContent = compScore;
    hintMessage = "Game Over. You lose!";
  }

  if (gameState === "draw")
    hintMessage = `User guess (${userGuess}), comp guess (${compGuess}). It's a draw!`;

  gameHint.textContent = hintMessage;
  addStateDataAttribute(gameState, userGuess);
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  isGameOver = false;
  userScoreSpot.textContent = userScore;
  compScoreSpot.textContent = compScore;
  gameHint.textContent = "Make your move...";
}

userGuessesElements.forEach((guessElement) =>
  guessElement.addEventListener("click", () => {
    const userGuess = guessElement.dataset.userGuess;
    const randomIndex = Math.floor(Math.random() * allGuesses.length);
    const compGuess = allGuesses.at(randomIndex);
    switch (userGuess.substring(0, 1) + compGuess.substring(0, 1)) {
      case "rs":
      case "pr":
      case "sp":
        manipulateTheGame("win", userGuess, compGuess);
        break;
      case "sr":
      case "rp":
      case "ps":
        manipulateTheGame("lose", userGuess, compGuess);
        break;
      default:
        manipulateTheGame("draw", userGuess, compGuess);
    }
  })
);

btnResetGame.addEventListener("click", resetGame);
