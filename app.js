let GameSeq = [];
let UserSeq = [];

let started = false;
let level = 0;
let btns = ["yellow", "green", "purple", "red"];
let h2 = document.querySelector("h2");

document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);
document.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  UserSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let rndIndx = Math.floor(Math.random() * 4);
  let randmColor = btns[rndIndx];
  let randBtn = document.querySelector(`.${randmColor}`);
  GameSeq.push(randmColor);

  btnflash(randBtn);
}

function checkAns(indx) {
  if (GameSeq[indx] === UserSeq[indx]) {
    if (UserSeq.length === GameSeq.length) {
      setTimeout(levelUp, 700);
    }
  } else {
    let score = level - 1;
    h2.innerHTML = `❌ Game Over! Your score was <b>${score}</b><br>Tap or Press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);
    GameReset();
  }
}

function buttonPress() {
  let btn = this;
  userflash(btn);
  let userColor = btn.getAttribute("id");
  UserSeq.push(userColor);
  checkAns(UserSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", buttonPress);
}

function GameReset() {
  level = 0;
  started = false;
  GameSeq = [];
  UserSeq = [];
}
