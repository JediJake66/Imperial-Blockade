const { default: axios } = require("axios");

const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
let currentRebelIndex = 370;
let width = 20;
let direction = 1;
let intervalId;
let goingRight = true;
let blownShips = [];
let results = 0;

document.getElementById("startButton").addEventListener("click", startGame);
// document.getElementById("profile").addEventListener("click", getScores);


// function getScores () {
//     const server = `http://localhost:8080/`
//      axios.get(`${server}high-scores`)
//      .then(res => console.log(res))
//      .catch(error => console.log("Error: ", error))
//   };

for (let i = 0; i < 400; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const imperialFleet = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49,
];

function placeImps() {
  for (let i = 0; i < imperialFleet.length; i++) {
    if (!blownShips.includes(i)) {
      squares[imperialFleet[i]].classList.add("impShip");
    }
  }
}

function removeImps() {
  for (let i = 0; i < imperialFleet.length; i++) {
    squares[imperialFleet[i]].classList.remove("impShip");
  }
}

squares[currentRebelIndex].classList.add("rebel");

function moveRebel(e) {
  squares[currentRebelIndex].classList.remove("rebel");
  switch (e.key) {
    case "ArrowLeft":
      if (currentRebelIndex % width !== 0) currentRebelIndex -= 1;
      break;
    case "ArrowRight":
      if (currentRebelIndex % width < width - 1) currentRebelIndex += 1;
      break;
    case "ArrowUp":
      break;
    default:
      resultsDisplay.innerHTML =
        "Use Left and Right Arrows to move and Up Arrow to shoot";
  }
  squares[currentRebelIndex].classList.add("rebel");
}
document.addEventListener("keydown", moveRebel);

function startGame() {
  function moveImps() {
    const leftEdge = imperialFleet[0] % width === 0;
    const rightEdge =
      imperialFleet[imperialFleet.length - 1] % width === width - 1;
    removeImps();

    if (rightEdge && goingRight) {
      for (let i = 0; i < imperialFleet.length; i++) {
        imperialFleet[i] += width + 1;
        direction = -1;
        goingRight = false;
      }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < imperialFleet.length; i++) {
        imperialFleet[i] += width - 1;
        direction = 1;
        goingRight = true;
      }
    }

    for (let i = 0; i < imperialFleet.length; i++) {
      imperialFleet[i] += direction;
    }

    placeImps();

    if (squares[currentRebelIndex].classList.contains("impShip", "rebel")) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(intervalId);
    }

    for (let i = 0; i < imperialFleet.length; i++) {
      if (imperialFleet[i] > squares.length) {
        resultsDisplay.innerHTML = "GAME OVER";
        clearInterval(intervalId);
      }
    }
    if (blownShips.length === imperialFleet.length) {
      resultsDisplay.innerHTML = "YOU WIN";
      clearInterval(intervalId);
    }
  }
  intervalId = setInterval(moveImps, 300);
}

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentRebelIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("impShip")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("impShip");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        200
      );
      clearInterval(laserId);

      const blowUpShip = imperialFleet.indexOf(currentLaserIndex);
      blownShips.push(blowUpShip);
      results++;
      resultsDisplay.innerHTML = results;
    }
  }

  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
      break;
    default:
  }
}

document.addEventListener("keydown", shoot)
