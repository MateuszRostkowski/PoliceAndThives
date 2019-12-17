const box = document.querySelector("main");
const cop = document.querySelector(".police");
const thiev = document.querySelector(".thieves");
const msgBox = document.querySelector(".messages");
const timer = document.querySelector(".timer");
const start = document.querySelector("#startGame");

// starting position after site loads
let copX = (box.offsetWidth - cop.offsetWidth) * (3 / 4);
let copY = (box.offsetHeight - cop.offsetHeight) / 2;
let thievX = (box.offsetWidth - thiev.offsetWidth) * (1 / 4);
let thievY = (box.offsetHeight - cop.offsetHeight) / 2;
// speed of players
let moveSpeed = 5;

let keys = [];

function randomSpawn() {
  copX = 400 + Math.floor(Math.random() * 36) * 10;
  copY = Math.floor(Math.random() * 36) * 10;
  thievX = Math.floor(Math.random() * 36) * 10;
  thievY = Math.floor(Math.random() * 36) * 10;
}

function checkCollision() {
  if (
    cop.offsetTop < thiev.offsetTop + thiev.offsetWidth &&
    cop.offsetTop + cop.offsetWidth > thiev.offsetTop &&
    cop.offsetLeft < thiev.offsetLeft + thiev.offsetHeight &&
    cop.offsetLeft + cop.offsetHeight > thiev.offsetLeft
  ) {
    gameOver("Police won");
  }
}

let count;

// start Counting down when game starts
function startCount() {
  clearInterval(count);

  timer.innerText = `00:30`;
  let counter = 30;

  count = setInterval(function() {
    counter--;
    timer.innerText = `00:${counter}`;
    if (counter <= 9) {
      timer.innerText = `00:0${counter}`;
    }
    if (counter === -1) {
      timer.innerText = "Game Ends";
      gameOver("Thieves won");
      clearInterval(count);
    }
  }, 1000);
}

// ends game
function gameOver(who) {
  cop.classList.add("crashed");
  thiev.classList.add("crashed");
  console.log(cop.classList);
  clearInterval(count);

  keys = [];

  document.removeEventListener("keydown", keyPressed);
  document.removeEventListener("keyup", keyReleased);
  timer.innerText = "Play again!";
  if (who === "Thieves won") {
    msgBox.innerText = who + "!";
  } else if (who === "Police won") {
    msgBox.innerText = who + "!";
  }
}

function startGame() {
  startCount();
  randomSpawn();

  msgBox.innerText = "Catch the thieve";

  cop.classList.remove("crashed");
  thiev.classList.remove("crashed");

  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function keyPressed(event) {
  keys[event.keyCode] = true;
}
function keyReleased(event) {
  keys[event.keyCode] = false;
}

//
function animate() {
  cop.style.left = copX + "px";
  cop.style.top = copY + "px";
  thiev.style.left = thievX + "px";
  thiev.style.top = thievY + "px";

  if (keys[37] && copX > 0) {
    copX -= moveSpeed;
  }
  if (keys[38] && copY > 0) {
    copY -= moveSpeed;
  }
  if (keys[39] && copX < box.offsetWidth - cop.offsetWidth) {
    copX += moveSpeed;
  }
  if (keys[40] && copY < box.offsetHeight - cop.offsetHeight) {
    copY += moveSpeed;
  }
  if (keys[65] && thievX > 0) {
    thievX -= moveSpeed;
  }
  if (keys[87] && thievY > 0) {
    thievY -= moveSpeed;
  }
  if (keys[68] && thievX < box.offsetWidth - thiev.offsetWidth) {
    thievX += moveSpeed;
  }
  if (keys[83] && thievY < box.offsetHeight - thiev.offsetHeight) {
    thievY += moveSpeed;
  }
  checkCollision();
  console.log(keys);

  requestAnimationFrame(animate);
}

animate();

start.addEventListener("click", startGame);
