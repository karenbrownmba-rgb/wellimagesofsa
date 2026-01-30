// =========================
// PUZZLE DATA
// =========================
const puzzles = [
  {
    scrambled: "T R A C S O L D E R A N E T",
    answer: "SCARLET CORD",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "R O C J I E H",
    answer: "JERICHO",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "H L A R O K T C",
    answer: "LOCKHART",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "R S A U M B N R E I O V T S E",
    answer: "VENUS AMBRISTER",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "T M A N O S R N T A M C I T E O N A",
    answer: "MOST ANCIENT MATRON",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "R E S R A U T E R",
    answer: "TREASURER",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "G K N T I S H",
    answer: "KNIGHTS",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "R D O I C R T E",
    answer: "DIRECTOR",
    clue: "Unscramble the letters."
  },
  {
    scrambled: "A S J O U H",
    answer: "JOSHUA",
    clue: "Unscramble the letters."
  }
];

// =========================
// GAME STATE
// =========================
let shuffledPuzzles = [];
let currentIndex = 0;
let score = 0;
let timerInterval;
let timeRemaining = 600; // 10 minutes

// =========================
// INITIALIZATION
// =========================
function initGame() {
  shuffledPuzzles = shuffle([...puzzles]);
  currentIndex = 0;
  score = 0;
  timeRemaining = 600;

  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = shuffledPuzzles.length;
  document.getElementById("currentIndex").textContent = currentIndex + 1;

  loadPuzzle();
  startTimer();
}

// =========================
// SHUFFLE FUNCTION
// =========================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// =========================
// LOAD PUZZLE
// =========================
function loadPuzzle() {
  const puzzle = shuffledPuzzles[currentIndex];

  document.getElementById("scramble").textContent = puzzle.scrambled;
  document.getElementById("clue").textContent = puzzle.clue;
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("currentIndex").textContent = currentIndex + 1;
}

// =========================
// TIMER
// =========================
function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    document.getElementById("timer").textContent =
      `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame("Time is up!");
    }
  }, 1000);
}

// =========================
// CHECK ANSWER
// =========================
function checkAnswer() {
  const userAnswer = document.getElementById("answerInput").value.trim().toUpperCase();
  const correctAnswer = shuffledPuzzles[currentIndex].answer.toUpperCase();

  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById("score").textContent = score;
    document.getElementById("feedback").textContent = "Correct!";
  } else {
    document.getElementById("feedback").textContent = "Incorrect. Try again or skip.";
  }
}

// =========================
// NEXT PUZZLE (BUTTON REQUIRED)
// =========================
function nextPuzzle() {
  currentIndex++;

  if (currentIndex >= shuffledPuzzles.length) {
    endGame("You completed all puzzles!");
    return;
  }

  loadPuzzle();
}

// =========================
// END GAME
// =========================
function endGame(message) {
  clearInterval(timerInterval);

  document.getElementById("finalMessage").textContent =
    `${message} Final Score: ${score} / ${shuffledPuzzles.length}`;

  document.getElementById("scramble").textContent = "Game Over";
  document.getElementById("clue").textContent = "";
  document.getElementById("answerInput").disabled = true;
}

// =========================
// RESTART GAME
// =========================
function restartGame() {
  document.getElementById("answerInput").disabled = false;
  document.getElementById("finalMessage").textContent = "";
  initGame();
}

// =========================
// EVENT LISTENERS
// =========================
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
document.getElementById("skipBtn").addEventListener("click", nextPuzzle);
document.getElementById("restartBtn").addEventListener("click", restartGame);

// =========================
// START GAME ON LOAD
// =========================
initGame();