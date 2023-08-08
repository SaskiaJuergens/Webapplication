var playerName; //konstante für Hover und weiterleiten auf Playerseite

var playerData = {
  Habul: [
    {
      date: "01.06.2022",
      level: "1",
      duration: "10:00",
      playerCount: "1",
      winnerName: "Mustermann",
      status: "abgebrochen",
    },
    {
      date: "16.05.2006",
      level: "3",
      duration: "0",
      playerCount: "1",
      winnerName: "-",
      status: "gewonnen",
    },
    {
      date: "02.04.2000",
      level: "2",
      duration: "6:00",
      playerCount: "1",
      winnerName: "-",
      status: "gewonnen",
    },
    {
      date: "01.06.2022",
      level: "1",
      duration: "15:00",
      playerCount: "2",
      winnerName: "Habul",
      status: "verloren",
    },
    {
      date: "24.02.2023",
      level: "2",
      duration: "09:00",
      playerCount: "2",
      winnerName: "Müller",
      status: "abgelaufen",
    },
    {
      date: "12.08.2022",
      level: "2",
      duration: "10:00",
      playerCount: "2",
      winnerName: "Mustermann",
      status: "gewonnen",
    },
    {
      date: "01.07.2022",
      level: "3",
      duration: "16:00",
      playerCount: "1",
      winnerName: "-",
      status: "gewonnen",
    },
    {
      date: "30.04.2023",
      level: "2",
      duration: "02:00",
      playerCount: "1",
      winnerName: "-",
      status: "gewonnen",
    },
    // Weitere Spielverlaufsinformationen hier hinzufügen
  ],
  Mustermann: [
    {
      date: "01.06.2052",
      level: "144",
      duration: "10:00",
      playerCount: "1",
      winnerName: "Mustermann",
      status: "beendet",
    },
    {
      date: "16.05.2046",
      level: "33",
      duration: "0",
      playerCount: "1",
      winnerName: "-",
      status: "beendet",
    },
    {
      date: "02.04.2030",
      level: "16",
      duration: "6:00",
      playerCount: "1",
      winnerName: "-",
      status: "beendet",
    },
    {
      date: "01.06.2022",
      level: "1",
      duration: "15:00",
      playerCount: "2",
      winnerName: "Habul",
      status: "beendet",
    },
    {
      date: "09.01.2023",
      level: "2",
      duration: "09:00",
      playerCount: "2",
      winnerName: "Müller",
      status: "beendet",
    },
    {
      date: "10.03.2022",
      level: "2",
      duration: "10:00",
      playerCount: "2",
      winnerName: "Mustermann",
      status: "beendet",
    },
    {
      date: "01.07.2022",
      level: "3",
      duration: "16:00",
      playerCount: "1",
      winnerName: "-",
      status: "nicht beendet",
    },
    {
      date: "04.09.2021",
      level: "2",
      duration: "02:00",
      playerCount: "1",
      winnerName: "-",
      status: "nicht beendet",
    },
  ],
  Müller: [
    {
      date: "04.06.2012",
      level: "2",
      duration: "10:00",
      playerCount: "1",
      winnerName: "Mustermann",
      status: "beendet",
    },
    {
      date: "16.05.2000",
      level: "3",
      duration: "0",
      playerCount: "1",
      winnerName: "-",
      status: "beendet",
    },
    {
      date: "02.04.1999",
      level: "1",
      duration: "6:00",
      playerCount: "1",
      winnerName: "-",
      status: "beendet",
    },
    {
      date: "01.06.2022",
      level: "1",
      duration: "15:00",
      playerCount: "2",
      winnerName: "Habul",
      status: "beendet",
    },
    {
      date: "24.02.2023",
      level: "2",
      duration: "09:00",
      playerCount: "2",
      winnerName: "Müller",
      status: "beendet",
    },
    {
      date: "24.08.2018",
      level: "2",
      duration: "10:00",
      playerCount: "2",
      winnerName: "Mustermann",
      status: "beendet",
    },
    {
      date: "01.01.2022",
      level: "1",
      duration: "16:00",
      playerCount: "1",
      winnerName: "-",
      status: "nicht beendet",
    },
    {
      date: "01.04.2023",
      level: "1",
      duration: "02:00",
      playerCount: "1",
      winnerName: "-",
      status: "nicht beendet",
    },
  ],
};

playerData = []; //Eventhandler für HTML

window.addEventListener("load", setup);
function setup() {
  //Tabelle "registrierte SpielerInnnen" setzen
  // hier wird die übergebene Variable aus dem Link aufgerufen
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("elem");
  console.log(product);
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
    // Das erstellte Objekt der Liste hinzuf�gen
    playerData.push(item);
  }
  console.log(playerData);
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
}

function displayPlayerGameData(playerID) {
  var table = document.getElementById("game-table");
  var tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear the table body before adding rows
}
