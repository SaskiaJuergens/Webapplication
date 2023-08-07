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
var inGame = false;
//timer noch nicht eingesetzt
var timerId;
var levelStartTime = 180; //    Sekunden
var startTime = levelStartTime; // startzeit am spielanfang
var MemoryList = [];

//variablen für hochladen eines neuen Spiels
var einzeln = 1; // Beispielwert für einzeln (1 oder 0)
var Datetime = "2023-08-04 12:00"; // Beispielwert für Datetime
var dauer = 60; // Beispielwert für dauer
var verlauf = "verlohren"; // Beispielwert für verlauf
var mitspieler = "NULL"; // Beispielwert für mitspieler
var gewinner = "NULL"; // Beispielwert für gewinner
var initiator = "NULL"; // Beispielwert für initiator

//spieler der Session
var spielerId;

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

items = [];

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  var elem = document.getElementById("start");
  elem.addEventListener("click", SpielStarten);
  var elem = document.getElementById("stop");
  elem.addEventListener("click", SpielStop);
  showResult();
}

//leere karten werden gezeichnet
function drawMemory() {
  var ULlist = document.getElementById("cards");

  for (var i = 0; i < MemoryList.length; i++) {
    console.log("ersterclick");
    var index = i;
    card = document.createElement("IMG");
    card.setAttribute("src", "../images/leerKarte.png");
    card.setAttribute("alt", items[0].title);
    card.setAttribute("id", index);
    card.className = "gameCard";
    card.style.width = "134px";
    card.style.height = "162px";
    card.style.borderRadius = "17px";
    card.style.border = "2px solid rgba(74, 104, 183)";
    card.style.margin = "5px";
    card.style.boxShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";

    if (window.matchMedia("(max-width: 700px)").matches) {
      // If media query matches
      card.style.width = "67px";
      card.style.height = "81px";
    } else {
      card.style.width = "16%";
    }

    cardList.push(card);
    ULlist.appendChild(cardList[i]);
    //event karte checken
    console.log("card");

    card.addEventListener("click", showCard);
  }
}

//karten können noch zweimal umgedreht werden
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
  firstCard.setAttribute("src", "../images/leerKarte.png");
  secondCard.setAttribute("src", "../images/leerKarte.png");
  uncoverCards = 0;
}

function pairCard() {
  cardPair += 1;
  document.getElementById("result").innerHTML =
    "Du hast " + cardPair + " Kartenpaare gesammelt.";
  firstCard.setAttribute("src", "../images/keineKarte.png");
  secondCard.setAttribute("src", "../images/keineKarte.png");
  uncoverCards = 0;
  if (cardPair == items.length) {
    SpielStop();
    document.getElementById("gameEnd").innerHTML = "Du hast gewonnen!";
    //TO DO Daten einsetzen insert Spiel
    getCurrentDateTime();
    initiator = spielerId;
    insertSpiel(
      einzeln,
      Datetime,
      dauer,
      verlauf,
      mitspieler,
      gewinner,
      initiator
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
  if (inGame == false && MemoryList.length != 0) {
    checkSession();
    displayMemoryList();
    drawMemory();
    startCountdown();
    document.getElementById("result").innerHTML = " ";
    document.getElementById("gameEnd").innerHTML = "";
    document.getElementById("response").innerHTML = " ";
    inGame = true;
  } else {
    document.getElementById("result").innerHTML =
      "Warte einen Moment bis die Spielkarten aus der Datenbank";
  }
}

//Spiel wird abgebrochen
//hier noch ein bug, wenn Spielstop muss man auch wieder Start drücken können
function SpielStop() {
  inGame = false;
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
  items = [];
  MemoryList = [];
  setup();
  clearInterval(timerId);
  document.getElementById("gameEnd").innerHTML =
    "Du hast das Spiel gestoppt. Das Spiel gilt als verlohren!";
  //TO DO Daten einsetzen insert Spiel
  spielDauer(); // berechnet Spieldauer
  getCurrentDateTime(); // berechnet aktuelles Datum
  initiator = spielerId;
  insertSpiel(
    einzeln,
    Datetime,
    dauer,
    verlauf,
    mitspieler,
    gewinner,
    initiator
  );
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
    //TO DO Daten einsetzen insert Spiel
    spielDauer(); // berechnet Spieldauer
    getCurrentDateTime(); // berechnet aktuelles Datum
    dauer = levelStartTime; //Startzeit in Sekunden
    initiator = spielerId;
    insertSpiel(
      einzeln,
      Datetime,
      dauer,
      verlauf,
      mitspieler,
      gewinner,
      initiator
    );
  }

  startTime--;
}

//aktuell verbliebene Zeit berechnen
function spielDauer() {
  console.log(document.getElementById("countdown").innerHTML);
  var leftTime = document.getElementById("countdown").innerHTML;
  const [hours, mins] = leftTime.split(":").map(Number);
  var totalSeconds = hours * 3600 + mins * 60;
  dauer = levelStartTime - totalSeconds;
}

//Der Countwodn wird gestartet
function startCountdown() {
  startTime = levelStartTime;
  clearInterval(timerId);
  updateCountdown();
  timerId = setInterval(updateCountdown, 1000);
}

//Countdown wird gestoppt
function stopCountdown() {
  clearInterval(timerId);
}

//Funktion um akutlles Datum auszugeben
function getCurrentDateTime() {
  const now = new Date();

  // Datum
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Uhrzeit
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Ausgabe im gewünschten Format
  const formattedDateTime = `"${year}-${month}-${day} ${hours}:${minutes}"`;
  Datetime = formattedDateTime;
}

// Registrierung Ajax-Events für das Hinzufügen eines Buchs
// und send eine Anfrage
function insertSpiel(
  einzeln,
  Datetime,
  dauer,
  verlauf,
  mitspieler,
  gewinner,
  initiator
) {
  // var insertButton = document.getElementById("insert");
  // Annahme: Du hast die Spielinformationen in JavaScript-Variablen gespeichert
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
  ajaxRequest.open("POST", "../php/spielInsert.php");
  ajaxRequest.send(formData);
}

// Falls das Spiel erfolgreicht inzugefügt ist ...
function ajaxInsertSpiel(event) {
  document.getElementById("response").innerHTML = this.responseText;
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
}

// Registrierung Ajax-Events für das Anzeigen aller cards
// und send eine Anfrage
function showResult() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowCards);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/cardShow.php");
  xmlhttp.send();
}

//karten anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowCards(event) {
  var myObj = JSON.parse(event.target.responseText);

  for (var i = 0; i < myObj.length; i++) {
    var title = myObj[i]["name"];
    var bild = myObj[i]["bild"];

    // Ein Objekt mit title und src erstellen
    var item = {
      title: title,
      src: bild,
    };

    // Das erstellte Objekt der Liste hinzufügen
    items.push(item);
    //doppelte Liste

    MemoryList = items.concat(items);
    console.log(MemoryList);
  }
}

//die aktuelle session checken

function checkSession() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);

        if (data.isLoggedIn) {
          // Der Benutzer ist angemeldet, und Sie können auf die 'spielerId' zugreifen
          spielerId = data.spielerId;
          console.log("Benutzer ist angemeldet. Spieler-ID: " + spielerId);
        } else {
          console.log("Benutzer ist nicht angemeldet.");
        }
      } else {
        console.log("Fehler beim Abrufen der Session-Daten.");
      }
    }
  };

  xmlhttp.open("GET", "../php/getSession.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send();
}
