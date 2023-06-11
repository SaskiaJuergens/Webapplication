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
var cardPair = 0;
var cardList = new Array();

var items = [
  {
    title: "Les demoiselles d'Avignon",
    src: "../images/lesDemoisellesdAvingnon.png",
  },
  { title: "The Starry Night", src: "../images/The-Starry-Night.png" },
  { title: "Mona Lisa", src: "../images/Mona-Lisa.png" },
  { title: "Der Schrei", src: "../images/der-schrei.png" },
  { title: "das Mädchen mit dem Perlohring", src: "../images/das-maedchen-mit-dem-perlohring.png" },
  { title: "Garten in Giverny", src: "../images/Garten-in-Giverny.png" },
  { title: "Der Kuss", src: "../images/Der-Kuss 1.png" },
  { title: "Turm der blauen Pferde", src: "../images/turm-der-blauen-pferde.png" },
  //hier die fehlenden Bilder einfügen
];

//da concat funktion nicht bei jedem Browser funktioniert
//doppelte Liste
var MemoryList = [
  {
    title: "Les demoiselles d'Avignon",
    src: "../images/lesDemoisellesdAvingnon.png",
  },
  { title: "The Starry Night", src: "../images/The-Starry-Night.png" },
  { title: "Mona Lisa", src: "../images/Mona-Lisa.png" },
  {
    title: "Les demoiselles d'Avignon",
    src: "../images/lesDemoisellesdAvingnon.png",
  },
  { title: "The Starry Night", src: "../images/The-Starry-Night.png" },
  { title: "Mona Lisa", src: "../images/Mona-Lisa.png" },

  { title: "Der Schrei", src: "../images/der-schrei.png" },
  { title: "Der Schrei", src: "../images/der-schrei.png" },

  { title: "das Mädchen mit dem Perlohring", src: "../images/das-maedchen-mit-dem-perlohring.png" },
  { title: "das Mädchen mit dem Perlohring", src: "../images/das-maedchen-mit-dem-perlohring.png" },

  { title: "Garten in Giverny", src: "../images/Garten-in-Giverny.png" },
  { title: "Garten in Giverny", src: "../images/Garten-in-Giverny.png" },

  { title: "Der Kuss", src: "../images/Der-Kuss 1.png" },
  { title: "Der Kuss", src: "../images/Der-Kuss 1.png" },

    { title: "Turm der blauen Pferde", src: "../images/turm-der-blauen-pferde.png" },
      { title: "Turm der blauen Pferde", src: "../images/turm-der-blauen-pferde.png" }

  //hier die fehlenden Bilder einfügen
];

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  var elem = document.getElementById("start");
  elem.addEventListener("click", SpielStarten);
  var elem = document.getElementById("stop");
  elem.addEventListener("click", SpielStop);
}

//Karten zeichnen lassen
//beim anklicken müssen hier die Bilder erscheinen aus der arraylist items
//src wird später ausgetauscht von items mit endsprechendem Wert
//item muss verdoppelt werden und dann randomly displayed

function drawCards() {
  var ULlist = document.getElementById("cards");
  for (var i = 0; i < items.length * 2; i++) {
    var index = i;
    var x = document.createElement("IMG");
    x.setAttribute("src", "../images/leereKarte.png");
    x.setAttribute("alt", items[0].title);
    x.setAttribute("id", index);
    x.className = "gameCard";
    x.style.width = "30%";

    cardList.push(x);
    ULlist.appendChild(cardList[i]);
    var uncoverCards = 0;

    //Event gekoppelt an drawCardsfunktion
    x.addEventListener(
      "click",
      function () {
        //hier wird von der Memorylist das jeweilige Element aufgerufen
        //Bedingung das nicht die selbe Karte angewählt wird
        if (this.getAttribute("src") == "../images/leereKarte.png") {
          uncoverCards += 1;
          document.getElementById("result").innerHTML = " ";

          if (
            uncoverCards <= 2 &&
            this.getAttribute("src") == "../images/leereKarte.png"
          ) {
            this.setAttribute("src", MemoryList[this.getAttribute("id")].src);

            //karten setzen
            if (uncoverCards == 1) {
              firstCard = this;
            }
            if (uncoverCards == 2) {
              secondCard = this;
              // Karten checken ob gleich
              if (firstCard.src == secondCard.src) {
                cardPair += 1;
                document.getElementById("result").innerHTML =
                  "Du hast " + cardPair + " Kartenpaare gesammelt.";
                firstCard.setAttribute("src", "../images/noCard.png");
                secondCard.setAttribute("src", "../images/noCard.png");
                firstCard.setAttribute("id", -1);
                if (cardPair == items.length) {
                  SpielStop();
                  document.getElementById("result").innerHTML =
                    "Du hast gewonnen!";
                }
              }
            }
          } else {
            //wenn zwei Pärchen aufgedeckt alles zurücksetzen
            uncoverCards = 1;
            if (firstCard.getAttribute("id") != -1) {
              firstCard.setAttribute("src", "../images/leereKarte.png");
              secondCard.setAttribute("src", "../images/leereKarte.png");
            }
            firstCard = false;
            secondCard = false;
            //nähstes Paar setzen
            this.setAttribute("src", MemoryList[this.getAttribute("id")].src);
            //karten setzen
            if (uncoverCards == 1) firstCard = this;
            if (uncoverCards == 2) secondCard = this;
          }
        }
      },
      false
    );
  }
}

//die MemoryList wird gemischt:
function displayMemoryList() {
  //random sort memoryList
  for (i = MemoryList.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = MemoryList[i];
    MemoryList[i] = MemoryList[j];
    MemoryList[j] = k;
  }
}

//Funktionen werden ausgeführt
//muss bei jedem Spielstart neu gemischt werden
function SpielStarten() {
  if (document.getElementById("cards").innerHTML === "")
    document.getElementById("result").innerHTML = " ";

  displayMemoryList();
  drawCards();
}

//Spiel wird abgebrochen
//hier noch ein bug, wenn Spielstop muss man auch wieder Start drücken können
function SpielStop() {
  var elem = document.getElementById("cards");
  var elemlength = document
    .getElementById("cards")
    .getElementsByClassName("gameCard");
  while (elemlength.length > 0) {
    elem.removeChild(elem.firstElementChild);
  }
  //Variablen werden zurückgesetzt
  document.getElementById("result").innerHTML = " ";
  firstCard = false;
  secondCard = false;
  cardPair = 0;
  cardList = new Array();
  setup();
}

//timer noch nicht eingesetzt
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
