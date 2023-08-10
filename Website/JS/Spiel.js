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

//angemeldet status
var statusAngemeldet;

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

//Spielkarten keine Paare
var items = [];
//Spielkarten mit Paaren (doppelt so lang)
var MemoryList = [];
//Spierler für doppelspiel
var spielerList = [];
//Liste der Spieler des selben Levels
var spielerSameLevel = [];

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  var elem = document.getElementById("start");
  elem.addEventListener("click", SpielStarten);
  var elem = document.getElementById("stop");
  elem.addEventListener("click", SpielStop);
  var elem = document.getElementById("doubleGame");
  elem.addEventListener("click", startDoubleGame);
  showResult();
  checkSession();
  showSpieler();
  showSpiel();
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
  if (
    uncoverCards <= 2 &&
    this.getAttribute("src") != "../images/keineKarte.png"
  ) {
    this.setAttribute("src", MemoryList[this.getAttribute("id")].src);

    uncoverCards += 1;
    console.log("uncoveredCardsNumber" + uncoverCards);
    if (uncoverCards == 1) {
      console.log("firstcardSet" + uncoverCards);
      firstCard = this;
    }
    if (uncoverCards == 2) {
      if (this != firstCard) {
        secondCard = this;
        uncoverCards += 1;
        console.log("secondcardset" + uncoverCards);

        if (firstCard.src == secondCard.src) {
          setTimeout(pairCard, 1000);
        } else {
          setTimeout(returnCard, 1000);
          console.log("secondcardsetumdrehen" + uncoverCards);
        }
      } else {
        uncoverCards -= 1;
      }
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
    verlauf = "gewonnen";
    var gewinner = spielerId;
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
  if (statusAngemeldet == true) {
    if (MemoryList.length != 0) {
      if (inGame == false) {
        displayMemoryList();
        drawMemory();
        startCountdown();
        document.getElementById("result").innerHTML = " ";
        document.getElementById("gameEnd").innerHTML = "";
        document.getElementById("response").innerHTML = " ";
        inGame = true;
      }
    } else {
      document.getElementById("result").innerHTML =
        "Warte einen Moment bis die Spielkarten aus der Datenbank";
    }
  } else {
    document.getElementById("gameEnd").innerHTML =
      "Du musst dich erst Anmelden, damit du Spielen kannst.";
  }
}

//Spiel wird abgebrochen
//hier noch ein bug, wenn Spielstop muss man auch wieder Start drücken können
function SpielStop() {
  if (inGame == true) {
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
    showResult();
    checkSession();
    showSpieler();
    showSpiel();
    clearInterval(timerId);
    document.getElementById("gameEnd").innerHTML =
      "Du hast das Spiel gestoppt. Das Spiel gilt als verlohren!";
    //TO DO Daten einsetzen insert Spiel
    spielDauer(); // berechnet Spieldauer
    getCurrentDateTime(); // berechnet aktuelles Datum
    verlauf = "verlohren";
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
  } else {
    document.getElementById("gameEnd").innerHTML =
      "Du musst das Spiel starten, um es zu beenden.";
  }
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
  console.log(
    "mein Countdown" + document.getElementById("countdown").innerHTML
  );
  var leftTime = document.getElementById("countdown").innerHTML;
  const [mins, sec] = leftTime.split(":").map(Number);
  var totalSeconds = mins * 60 + sec;
  console.log(totalSeconds);
  console.log(levelStartTime);
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

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  Datetime = formattedDateTime;
}

// Spieler laden für Double Spiel
/**
 * Karten werden angezeigt
 */
function showSpiel() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowSpiel);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/playerShow.php");
  xmlhttp.send();
}

//karten anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowSpiel(event) {
  var myObj = JSON.parse(event.target.responseText);

  for (var i = 0; i < myObj.length; i++) {
    var einzeln = myObj[i]["einzeln"];
    var Datetime = myObj[i]["Datetime"];
    var dauer = myObj[i]["dauer"];
    var verlauf = myObj[i]["verlauf"];
    var mitspieler = myObj[i]["mitspieler"];
    var gewinner = myObj[i]["gewinner"];
    var initiator = myObj[i]["initiator"];

    // Ein Objekt mit title und src erstellen
    var item = {
      einzeln: einzeln,
      Datetime: Datetime,
      dauer: dauer,
      verlauf: verlauf,
      mitspieler: mitspieler,
      gewinner: gewinner,
      initiator: initiator,
    };

    // Das erstellte Objekt der Liste hinzufügen

    spielList.push(item);
  }
  console.log(spielList);
}

var spielList = [];

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

/**
 * Karten werden angezeigt
 */
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

    MemoryList = items.concat(items);
  }
  console.log(MemoryList);
}

//die aktuelle session checken
function checkSession() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);
        console.log(xmlhttp.responseText);
        if (data.isLoggedIn) {
          // Der Benutzer ist angemeldet, und Sie können auf die 'spielerId' zugreifen
          spielerId = data.spielerId;
          console.log("Benutzer ist angemeldet. Spieler-ID: " + spielerId);
          statusAngemeldet = true;
          console.log(statusAngemeldet);
        } else {
          console.log("Benutzer ist nicht angemeldet.");
          statusAngemeldet = false;
        }
      } else {
        console.log("Fehler beim Abrufen der Session-Daten.");
      }
    }
  };

  var action = "check"; // Die Aktion, die du übergeben möchtest
  var url = "../php/session.php?action=" + action; // Füge die Aktion zur URL hinzu
  xmlhttp.open("GET", url, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send();
}

// Spieler laden für Double Spiel
/**
 * Karten werden angezeigt
 */
function showSpieler() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowSpieler);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/playerShow.php");

  xmlhttp.send();
}

//karten anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowSpieler(event) {
  var myObj = JSON.parse(event.target.responseText);

  for (var i = 0; i < myObj.length; i++) {
    var id = myObj[i]["id"];
    var spielname = myObj[i]["spielname"];
    var email = myObj[i]["email"];
    var passwort = myObj[i]["passwort"];
    var level = myObj[i]["level"];

    // Ein Objekt mit title und src erstellen
    var item = {
      id: id,
      spielname: spielname,
      email: email,
      passwort: passwort,
      level: level,
    };

    // Das erstellte Objekt der Liste hinzufügen

    spielerList.push(item);
  }
  console.log(spielerList);
}

/**
 *
 * Abstatz für Doppelspiel -----------------------------------------------------------------------------------------------
 */
function startDoubleGame() {
  SpielerAnfrage();
  spielerAntwort();
}

function SpielerAnfrage() {
  var currentPlayer = getPlayerByID(spielerList, spielerId);
  //  console.log(currentPlayer.level);
  var currentPlayers = getPlayersByLevel(spielerList, currentPlayer.level);
  // console.log(currentPlayers);
  createButtonsFromPlayers(currentPlayers);
}

/**
 * Gibt den angemeldeten Player zurück der über ID gesucht wird
 *
 * @param {*} data
 * @param {*} id
 * @returns
 */
function getPlayerByID(data, id) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
  return null; // Wenn keine Übereinstimmung gefunden wurde
}

/**
 *
 * Gibt zurück wechle Spieler das selbe Level haben
 *
 * @param {Liste der Spieler} data
 * @param {Das Level, was der angemeldete Spieler hat
 * } level
 * @returns
 */
function getPlayersByLevel(data, level) {
  var spielerSameLevel = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].level === level) {
      spielerSameLevel.push(data[i]);
    }
  }

  return spielerSameLevel;
}

var gegner = [];

/**
 * Buttons werden erstellt um request zu senden
 * @param {*} players
 */
function createButtonsFromPlayers(players) {
  var buttonsContainer = document.getElementById("buttonAnfrage"); // Annahme: Hier ist ein HTML-Element für die Buttons
  console.log(players);

  var h2Element = document.createElement("h3");
  h2Element.textContent =
    "Suche dir einen Mitspieler aus und schicke eine Nachricht";
  buttonsContainer.appendChild(h2Element);

  for (var i = 0; i < players.length; i++) {
    if (players[i].spielname != 0) {
      var player = players[i];
      var button = document.createElement("button");
      button.classList.add("button-start");
      button.textContent = player.spielname;
      console.log("test");

      // Verwende eine Hilfsfunktion, um den aktuellen Wert von 'player' in die Klosure einzuschließen
      button.addEventListener("click", createClickListener(player));

      buttonsContainer.appendChild(button);
    }
  }
}

//Anfrage schreiben
function createClickListener(player) {
  return function () {
    console.log(player.spielname);
    mitspieler = player.id;

    var anfrageDiv = document.getElementById("anfrage");

    // Eingabefeld erstellen
    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "messageInput";
    inputField.placeholder = "Nachricht eingeben";
    anfrageDiv.appendChild(inputField);

    // Button erstellen
    var sendButton = document.createElement("button");

    sendButton.classList.add("button-start");

    sendButton.innerText = "Nachricht senden";
    sendButton.addEventListener("click", function () {
      var message = inputField.value;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "../php/requestDoubleGame.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            anfrageDiv.textContent = xhr.responseText;
          } else {
            alert("Fehler beim Senden der Nachricht.");
          }
        }
      };
      xhr.send(
        "&mitspieler=" +
          encodeURIComponent(mitspieler) +
          "&message=" +
          encodeURIComponent(message) +
          "&sender=" +
          encodeURIComponent(spielerId)
      );
    });

    anfrageDiv.appendChild(sendButton);
  };
}

function spielerAntwort() {
  var anfrageEingehendDiv = document.getElementById("anfrageEingehend");

  var h2Element = document.createElement("h3");
  h2Element.textContent = "Eingegangene Anfragen";
  anfrageEingehendDiv.appendChild(h2Element);

  var receivedRequests = getReceivedRequestsFromDB();

  for (var i = 0; i < receivedRequests.length; i++) {
    var request = receivedRequests[i];
    var requestno = receivedRequests[i];
    var requestDiv = document.createElement("div");

    var requestText = document.createElement("p");
    requestText.textContent = "Anfrage von: " + request.sender;
    requestDiv.appendChild(requestText);

    var requestFrage = document.createElement("p");
    requestFrage.textContent = request.message;
    requestDiv.appendChild(requestFrage);

    var acceptButton = document.createElement("button");
    acceptButton.innerText = "Annehmen";
    acceptButton.classList.add("button-color3");

    acceptButton.addEventListener("click", createAcceptClickListener(request));

    var declinetButton = document.createElement("button");
    declinetButton.innerText = "nicht annehmen";
    declinetButton.classList.add("button-color3");

    declinetButton.addEventListener(
      "click",
      createAcceptClickListener(requestno)
    );

    requestDiv.appendChild(declinetButton);
    anfrageEingehendDiv.appendChild(requestDiv);
  }
}

function getReceivedRequestsFromDB() {
  var mitspieler = spielerId;

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "../php/requestDoubleGame.php?mitspieler=" + mitspieler,
    false
  ); // Synchroner Request (nicht empfohlen in der Praxis)
  xhr.send();

  if (xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response);
    return response.receivedRequests;
  } else {
    console.error("Fehler beim Abrufen der empfangenen Anfragen.");
    return [];
  }
}

function updateRequestInDB(requestId, newValue) {
  // Hier die Logik einfügen, um die Anfrage in der DB zu aktualisieren
  // Zum Beispiel durch eine AJAX-Anfrage an den Server
}

function createAcceptClickListener(request) {
  return function () {
    // Hier den Code einfügen, um den Spielzusage-Wert in der DB zu aktualisieren (z.B. per AJAX)
    // und dann das angeklickte Anfrage-Div entfernen oder aktualisieren

    // Beispiel: Annahme der Anfrage durch Aktualisierung des 'spielzusage' auf 1
    updateRequestInDB(request.id, 1); // Annahme: Funktion, um die Anfrage in der DB zu aktualisieren
    alert("Anfrage angenommen!");
  };
}

function createAcceptClickListener(requestno) {
  return function () {
    // Hier den Code einfügen, um den Spielzusage-Wert in der DB zu aktualisieren (z.B. per AJAX)
    // und dann das angeklickte Anfrage-Div entfernen oder aktualisieren

    // Beispiel: Annahme der Anfrage durch Aktualisierung des 'spielzusage' auf 1
    // Annahme: Funktion, um die Anfrage in der DB zu aktualisieren
    alert("Anfrage nicht angenommen!");
  };
}