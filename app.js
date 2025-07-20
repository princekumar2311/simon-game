let GameSeq = [];
let UserSeq = [];

let started = false;
let level = 0;
let acceptingInput = false;

const btns = ["yellow", "green", "purple", "red"];
const h2 = document.querySelector("h2");

// Start game: keyboard or mobile touch
document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);
document.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

// Flash the system-selected button
function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

// Flash the user-selected button
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 300);
}

// Move to next level
function levelUp() {
  UserSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const rndIndx = Math.floor(Math.random() * 4);
  const randColor = btns[rndIndx];
  const randBtn = document.querySelector(`.${randColor}`);
  
  GameSeq.push(randColor);

  acceptingInput = false;
  btnflash(randBtn);
  setTimeout(() => {
    acceptingInput = true;
  }, 300);
}

// Check user's button click sequence
function checkAns(indx) {
  if (GameSeq[indx] === UserSeq[indx]) {
    if (UserSeq.length === GameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    const score = level - 1; // Store before reset
    h2.innerHTML = `❌ Game Over! Your score was <b>${score}</b><br>Tap or Press any key to restart.`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);

    // Delay reset to avoid clearing score immediately
    setTimeout(GameReset, 300); // delay reset
  }
}


// Handle user click
function buttonPress() {
  if (!acceptingInput) return;

  const btn = this;
  userflash(btn);

  const userColor = btn.getAttribute("id");
  UserSeq.push(userColor);
  checkAns(UserSeq.length - 1);
}

// Attach event to buttons
const allbtns = document.querySelectorAll(".btn");
allbtns.forEach((btn) => {
  btn.addEventListener("click", buttonPress);
});

// Reset game variables
function GameReset() {
  level = 0;
  started = false;
  GameSeq = [];
  UserSeq = [];
  acceptingInput = false;
}
