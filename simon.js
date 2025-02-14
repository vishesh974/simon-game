let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;

// for game start function

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("key pressed");
    started = true;
    nextSequence();
  }
});

// for button flash function

function btnflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

// for user button flash function

function userflash(btn) {
  btn.classList.add("user");
  setTimeout(function () {
    btn.classList.remove("user");
  }, 300);
}

// for find btn randomly function

function nextSequence() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randinx = Math.floor(Math.random() * 4);
  let randcolor = btns[randinx];
  let randbtn = document.querySelector(`.${randcolor}`);

  // console.log(randinx);
  // console.log(randcolor);
  // console.log(randbtn);

  gameseq.push(randcolor);
  console.log(gameseq);
  btnflash(randbtn);
}

// for check user seq function

function checkUserSeq(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
        setTimeout(nextSequence, 1000);
    }
  } else {
    h2.innerHTML = `Game Over: press any key to start <br> your score was ${level}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
   reset();
    hightestscore(level);
  }
}

// for btn press function

function btnpress() {
  let btn = this;
  userflash(btn);

  usercolor = btn.getAttribute("id");
  console.log(usercolor);
  userseq.push(usercolor);

  checkUserSeq(userseq.length-1);
}

// for all btn press function

let allbtn = document.querySelectorAll(".btn");

for (btn of allbtn) {
  btn.addEventListener("click", btnpress);
}

let highestScore = 0;

function hightestscore(level) {
  let score = document.querySelector(".score");
  if (level > highestScore) {
    highestScore = level;
    score.innerText = highestScore;
  }
}

function reset(){
  userseq = [];
  gameseq = [];
  started = false;
}