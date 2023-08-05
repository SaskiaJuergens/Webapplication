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
var card = 0;
//timer noch nicht eingesetzt
var timerId;
var levelStartTime = 5; // 3 minutes in Sekunden
var startTime = levelStartTime; // startzeit am spielanfang

var items = [
  {
    title: "Les demoiselles d'Avignon",
    src: "../images/lesDemoisellesdAvingnon.png",
  },
  { title: "The Starry Night", src: "../images/The-Starry-Night.png" },
  { title: "Mona Lisa", src: "../images/Mona-Lisa.png" },
  { title: "Der Schrei", src: "../images/der-schrei.png" },
  {
    title: "das Mädchen mit dem Perlohring",
    src: "../images/das-maedchen-mit-dem-perlohring.png",
  },
  { title: "Garten in Giverny", src: "../images/Garten-in-Giverny.png" },
  { title: "Der Kuss", src: "../images/Der-Kuss 1.png" },
  {
    title: "Turm der blauen Pferde",
    src: "../images/turm-der-blauen-pferde.png",
  },
  //hier die fehlenden Bilder einfügen
];

//doppelte Liste

MemoryList = items.concat(items);

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  var elem = document.getElementById("start");
  elem.addEventListener("click", SpielStarten);
  var elem = document.getElementById("stop");
  elem.addEventListener("click", SpielStop);
}

//leere karten werden gezeichnet
function drawMemory() {
  insertSpiel();
  var ULlist = document.getElementById("cards");
  var ULlist = document.getElementById("cards");
  for (var i = 0; i < MemoryList.length; i++) {
    var index = i;
    card = document.createElement("IMG");
    card.setAttribute("src", "../images/leereKarte.png");
    card.setAttribute("alt", items[0].title);
    card.setAttribute("id", index);
    card.className = "gameCard";
    card.style.width = "16%";

    if (window.matchMedia("(max-width: 700px)").matches) {
      // If media query matches
      card.style.width = "25%";
    } else {
      card.style.width = "16%";
    }

    cardList.push(card);
    ULlist.appendChild(cardList[i]);
    //event karte checken
    card.addEventListener("click", showCard);
  }
}

var uncoverCards = 0;
//Karte umdrehen
function showCard() {
  console.log(this.getAttribute("id"));

  //hier wird von der Memorylist das jeweilige Element aufgerufen
  //Bedingung das nicht die selbe Karte angewählt wird
  if (uncoverCards <= 2)
    this.setAttribute("src", MemoryList[this.getAttribute("id")].src);

  uncoverCards += 1;
  console.log("uncoveredCardsNumber" + uncoverCards);
  if (uncoverCards == 1) {
    console.log("firstcardSet" + uncoverCards);
    firstCard = this;
  }
  if (uncoverCards == 2) {
    secondCard = this;
    uncoverCards += 1;
    console.log("secondcardset" + uncoverCards);

    if (firstCard.src == secondCard.src) {
      setTimeout(pairCard, 1000);
    } else {
      setTimeout(returnCard, 1000);
      console.log("secondcardsetumdrehen" + uncoverCards);
    }
  }
}
//Karte umdrehen
function returnCard() {
  // Code, der erst nach 3 Sekunden ausgeführt wird
  firstCard.setAttribute("src", "../images/leereKarte.png");
  secondCard.setAttribute("src", "../images/leereKarte.png");
  uncoverCards = 0;
}

function pairCard() {
  cardPair += 1;
  document.getElementById("result").innerHTML =
    "Du hast " + cardPair + " Kartenpaare gesammelt.";
  firstCard.setAttribute("src", "../images/noCard.png");
  secondCard.setAttribute("src", "../images/noCard.png");
  uncoverCards = 0;
  if (cardPair == items.length) {
    SpielStop();
    document.getElementById("gameEnd").innerHTML = "Du hast gewonnen!";
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
  document.getElementById("gameEnd").innerHTML = "";
  displayMemoryList();
  drawMemory();
  startCountdown();
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
  clearInterval(timerId);
  document.getElementById("gameEnd").innerHTML =
    "Du hast das Spiel gestoppt. Das Spiel gilt als verlohren!";
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

//Der Countdown wird geupdatet
function updateCountdown() {
  var countdownElement = document.getElementById("countdown");
  countdownElement.textContent = formatTime(startTime);

  if (startTime <= 0) {
    clearInterval(timerId);
    SpielStop();
    document.getElementById("gameEnd").innerHTML =
      "Du hast verlohren! Du hast das Spiel nicht in angegebener Zeit geschafft.";
  }

  startTime--;
}

//Der Countwodn wird gestartet
function startCountdown() {
  startTime = levelStartTime;
  clearInterval(timerId);
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
  clearInterval(timerId);
}

// Registrierung Ajax-Events für das Hinzufügen eines Buchs
// und send eine Anfrage
function insertSpiel() {
  // var insertButton = document.getElementById("insert");
  // Annahme: Du hast die Spielinformationen in JavaScript-Variablen gespeichert
  const einzeln = 1; // Beispielwert für einzeln (1 oder 0)
  const Datetime = "2023-08-04 12:00"; // Beispielwert für Datetime
  const dauer = 60; // Beispielwert für dauer
  const verlauf = "Spielverlauf hier"; // Beispielwert für verlauf
  const mitspieler = "3"; // Beispielwert für mitspieler
  const gewinner = "4"; // Beispielwert für gewinner
  const initiator = "3"; // Beispielwert für initiator

  var formData = new FormData();

  formData.append("einzeln", einzeln);
  formData.append("Datetime", Datetime);
  formData.append("dauer", dauer);
  formData.append("verlauf", verlauf);
  formData.append("mitspieler", mitspieler);
  formData.append("gewinner", gewinner);
  formData.append("initiator", initiator);

  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", ajaxInsertSpiel);
  ajaxRequest.addEventListener("error", ajaxFehler);
  ajaxRequest.open("POST", "../php/spielTest.php");
  ajaxRequest.send(formData);
}

// Falls das Buch erfolgreicht inzugefügt ist ...
function ajaxInsertSpiel(event) {
  document.getElementById("infoInsert").innerHTML = this.responseText;
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
}
