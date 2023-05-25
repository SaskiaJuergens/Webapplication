//spiel.html
const moves = document.getElementById("movesCount");
const timeValue = document.getElementById("time");
const starButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls.container");
var cards;
var interval;
var firstCard = false;
var secondCard = false;

//Items array
const items = [
  {
    title: "Les demoiselles d'Avignon",
    image: "../images/lesDemoisellesdAvingnon.jpg",
  },
  { title: "The Starry Night", image: "../images/The-Starry-Night.jpg" },
  { title: "Mona Lisa", image: "../images/Mona-Lisa.jpg" },
];

//timer
var seconds = 0,
  minutes = 0;
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  var secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  var minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//Zählung der Counts
var movesCount = 0,
  winCount = 0;
//zählen
const movesCounter = () => {
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Random Item von der Array liste
const generateRondom = (size = 4) => {
  var tempArray = [...items];
  var cardValues = [];
  size = (size * size) / 2;
  //Random item auswahl
  for (var i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //wenn ausgewählt entfernen vom tempArray
    tempArray.splice(randomIndex, 1);
  }
  return cardValue;
};

const matrixGenerator = (cardValue, size = 4) => {
  gameContainer.innerHTML = "";
  cardValue = [...cardValue, ...cardValue];
  cardValue.sort(() => Math.randomI() - 0.5);
  for (var i = 0; i < size * size; i++) {}
};
