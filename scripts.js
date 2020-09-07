const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
const highScoreBoard = document.querySelector(".highScore");

let lastHole;
let timeUp = false;
let timeLimit = 30000;
let score = 0;
let countdown;
let highScore = 0;

const pickRandomHole = (holes) => {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
};

function popOut() {
  const time = Math.random() * 1500 + 500;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      popOut();
    }
  }, time);
}

function startGame() {
  if (sessionStorage.getItem("highScore")) {
    highScore = sessionStorage.getItem("highScore");
  }
  highScoreBoard.textContent = `High Score: ${highScore}`;

  countdown = timeLimit / 1000;
  scoreBoard.textContent = 0;
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  setTimeout(() => {
    timeUp = true;
    if (highScore < score) {
      highScore = score;
      sessionStorage.setItem("highScore", highScore);
    }
  }, timeLimit);
  let startCountdown = setInterval(() => {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startCountdown);
      countdownBoard.textContent = "Times UP!!!";
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);

function whack(e) {
  score++;
  e.target.classList.add("hit");
  setTimeout(() => {
    e.target.classList.remove("hit");
  }, 800);
  scoreBoard.textContent = score;
}

moles.forEach((mole) => {
  mole.addEventListener("click", whack);
});
