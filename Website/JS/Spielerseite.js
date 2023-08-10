var playerName; //konstante für Hover und weiterleiten auf Playerseite
var spielerList = [];

var playerData = []; //Eventhandler für HTML
var currentID;

window.addEventListener("load", setup);
function setup() {
  //Tabelle "registrierte SpielerInnnen" setzen
  // hier wird die übergebene Variable aus dem Link aufgerufen
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("elem");
  console.log(product);
  showSpieler();
  showSpiel();

  // showPlayerPage(product);
}

// Funktion zum Anzeigen der Spielerseite und Aktualisierung der Spielerinformationen
function showPlayerPage(playerName) {
  // Spielerseite anzeigen

  document.getElementById("player-page").style.display = "block";

  // Spielername in der Überschrift anzeigen

  document.getElementById("player-name").innerHTML =
    "<b>" + playerName + "</b>";

  // Spielerinformationen aktualisieren
  const playerInfo = playerData[playerName];
  const gameListBody = document.getElementById("game-list-body");
  //gameListBody.innerHTML = ""; // Vorherige Einträge löschen

  playerInfo.forEach((game) => {
    const row = document.createElement("tr");
    const dateCell = createTableCell(game.date);
    const levelCell = createTableCell(game.level);
    const durationCell = createTableCell(game.duration);
    const playerCountCell = createTableCell(game.playerCount);
    const winnerNameCell = createTableCell(game.winnerName);
    const statusCell = createTableCell(game.status);

    row.appendChild(dateCell);
    row.appendChild(levelCell);
    row.appendChild(durationCell);
    row.appendChild(playerCountCell);
    row.appendChild(winnerNameCell);
    row.appendChild(statusCell);

    gameListBody.appendChild(row);
  });
}

// Funktion zum Erstellen einer Tabellenzelle mit dem gegebenen Inhalt
function createTableCell(content) {
  const cell = document.createElement("td");
  const span = document.createElement("span");
  span.innerHTML = content;
  cell.appendChild(span);
  return cell;
}

// Funktion zum Sortieren der Tabelle nach Spieldatum oder Level
function sortTable(columnIndex) {
  var table = document.getElementById("game-list");
  var tbody = table.getElementsByTagName("tbody")[0];
  var rows = tbody.getElementsByTagName("tr");
  var sortedRows = Array.from(rows);

  sortedRows.sort(function (a, b) {
    var aValue = a.getElementsByTagName("td")[columnIndex].textContent;
    var bValue = b.getElementsByTagName("td")[columnIndex].textContent;
    return aValue.localeCompare(bValue);
  });

  for (var i = 0; i < sortedRows.length; i++) {
    tbody.appendChild(sortedRows[i]);
  }
}

/**
 * level werden angezeigt
 */
function showSpiel() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowSpiel);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/spielShow.php");
  xmlhttp.send();
}

//Level anzeigen
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
    console.log(item);

    // Tabelle-Rumpf
    var tbody = document.getElementById("resultCard");
    for (var i = 0; i < myObj.length; i++) {
      var tr = document.createElement("tr");

      var td1 = document.createElement("td");
      var einzeln = myObj[i]["einzeln"];
      td1.appendChild(document.createTextNode(einzeln));
      tr.appendChild(td1);

      var td1 = document.createElement("td");
      var Datetime = myObj[i]["Datetime"];
      td1.appendChild(document.createTextNode(Datetime));
      tr.appendChild(td1);

      var td1 = document.createElement("td");
      var verlauf = myObj[i]["verlauf"];
      td1.appendChild(document.createTextNode(verlauf));
      tr.appendChild(td1);

      var td1 = document.createElement("td");
      var mitspieler = getPlayerByID(spielerList, myObj[i]["mitspieler"]);
      td1.appendChild(document.createTextNode(initiator.mitspieler));
      tr.appendChild(td1);

      var td1 = document.createElement("td");
      var gewinner = getPlayerByID(spielerList, myObj[i]["gewinner"]);

      td1.appendChild(document.createTextNode(gewinner.spielname));
      tr.appendChild(td1);

      var td1 = document.createElement("td");
      var initiator = getPlayerByID(spielerList, myObj[i]["initiator"]);

      td1.appendChild(document.createTextNode(initiator.spielname));
      tr.appendChild(td1);

      tbody.appendChild(tr);
    }

    console.log(item);
    // Das erstellte Objekt der Liste hinzuf�gen
    playerData.push(item);
  }
  console.log(playerData);
  var tupel = getPlayerByID(spielerList, 3);
  console.log("tupel: " + tupel.spielname);
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
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
    if (data[i].id == id) {
      return data[i];
    }
  }
  return null; // Wenn keine Übereinstimmung gefunden wurde
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
