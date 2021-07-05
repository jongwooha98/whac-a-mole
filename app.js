const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
const easyMode = document.querySelector('#easy-mode');
const normalMode = document.querySelector('#normal-mode');
const hardMode = document.querySelector('#hard-mode');
const gameModeDisplay = document.querySelector('#game-mode-display');
const startPause = document.querySelector('#start-pause');
// startPause.innerHTML = 'START';
let socre = document.querySelector('#score');
let result = 0;
let hitPosition;
let currentTime = 60;
let timerId;
let countDownTimerId;
let gameMode = 1000;
let isPaused = true;

function randomSquare() {
  square.forEach((moleSquare) => {
    moleSquare.classList.remove('mole');
    moleSquare.style.pointerEvents = 'auto';
  });
  let randomPosition = square[Math.floor(Math.random() * 9)];
  randomPosition.classList.add('mole');
  hitPosition = randomPosition.id;
}

square.forEach((moleSquare) => {
  moleSquare.addEventListener('mouseup', () => {
    if (moleSquare.id === hitPosition) {
      result++;
      socre.textContent = result;
      moleSquare.classList.remove('mole');
      moleSquare.style.pointerEvents = 'none';
    }
  });
});

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime < 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
    isPaused = true;
    currentTime = 60;
    timeLeft.textContent = '60';
    socre.textContent = '0';
    startPause.textContent = 'PLAY AGAIN';
  }
}

startPause.textContent = 'START';
function handlePause() {
  if (isPaused === true) {
    startPause.textContent = 'PAUSE';
    timerId = setInterval(randomSquare, gameMode); // change interval for easy mode & hard mode
    countDownTimerId = setInterval(countDown, 1000);
    isPaused = false;
  } else if (isPaused === false) {
    startPause.textContent = 'START';
    isPaused = true;
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    square.style.pointerEvents = 'none';
    square.forEach((x) => {
      x.style.pointerEvents = 'none';
    });
  }
}

// Game Mode
gameModeDisplay.textContent = 'Normal Mode';
easyMode.addEventListener('click', () => {
  gameMode = 1500;
  gameModeDisplay.textContent = 'Easy Mode';
  gameModeDisplay.style.color = 'blue';
});
normalMode.addEventListener('click', () => {
  gameMode = 1000;
  gameModeDisplay.textContent = 'Normal Mode';
  gameModeDisplay.style.color = 'black';
});
hardMode.addEventListener('click', () => {
  gameMode = 500;
  gameModeDisplay.textContent = 'Hard Mode';
  gameModeDisplay.style.color = 'red';
});
