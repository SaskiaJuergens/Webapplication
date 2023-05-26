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

var items = [
  {
    title: "Les demoiselles d'Avignon",
    src: "../images/lesDemoisellesdAvingnon.png",
  },
  { title: "The Starry Night", src: "../images/The-Starry-Night.png" },
  { title: "Mona Lisa", src: "../images/Mona-Lisa.png" },
];

//Karten zeichnen lassen
//beim anklicken müssen hier die Bilder erscheinen aus der arraylist items
//src wird später ausgetauscht von items mit endsprechendem Wert
//item muss verdoppelt werden und dann randomly displayed

var cardList = new Array();
function drawCards() {
  var ULlist = document.getElementById("cards");
  for (var i = 0; i < items.length * 2; i++) {
    var index = i;

    var x = document.createElement("IMG");
    x.setAttribute("src", "../images/leereKarte.png");
    x.setAttribute("alt", items[0].title);
    x.setAttribute("id", index);
    cardList.push(x);
    ULlist.appendChild(cardList[i]);

    x.addEventListener(
      "click",
      function () {
        //hier muss noch eine RandomListe hin
        //counter für 2 aufgedeckte & vergleich von karten
        this.setAttribute("src", "../images/Mona-Lisa.png");
      },
      false
    );
  }
}

drawCards();

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
