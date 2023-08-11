var playerName; //konstante für Hover und weiterleiten auf Playerseite

//Liste registrierte SpielerInnnen

var items = [
  {
    lastName: "Habul",
    firstName: "Simon",
    mail: "sh@hfk.com",
    level: "3",
  },
  {
    lastName: "Mustermann",
    firstName: "Lucie",
    mail: "lucieM@hfk.com",
    level: "2",
  },
  {
    lastName: "Müller",
    firstName: "Maria",
    mail: "mm@hfk.com",
    level: "3",
  },
];

//Eventhandler für HTML

window.addEventListener("load", setup);
function setup() {
  //Tabelle "registrierte SpielerInnnen" setzen
  loadPlayers();
}

//Tabelle registrierte Spieler laden (direkt am Anfang)
function loadPlayers() {
  var table = document.getElementById("spieler-tabelle");
  document.getElementById("table-background").style.display = "block";
  //document.getElementById("player-page").style.display = "none";
  // document.getElementById("table-background").style.display = "block";

  items.forEach((game) => {
    const row = document.createElement("tr");
    const lastName = createTableCell();

    const lastNameLink = document.createElement("a");
    lastNameLink.href = "Spielerseite.html?elem=" + game.lastName;
    lastNameLink.textContent = game.lastName;

    lastName.appendChild(lastNameLink);
    row.appendChild(lastName);

    const firstName = createTableCell(game.firstName);
    const mailCell = createTableCell(game.mail);
    const currentLevel = createTableCell(game.level);

    playerName = row.appendChild(lastName);

    row.appendChild(firstName);
    row.appendChild(mailCell);
    row.appendChild(currentLevel);

    playerName.addEventListener(
      "mouseenter",
      function () {
        hoverEffect(this);
      },
      false
    );

    lastName.addEventListener(
      "mouseleave",
      function () {
        mouseOut(this);
      },
      false
    );

    table.appendChild(row);
  });
}

//hover für link
function hoverEffect(a) {
  a.style.color = "rgba(74, 104, 183)";
  a.style.textDecoration = "underline";
}

//hover für link
function mouseOut(a) {
  a.style.color = "black";
  a.style.textDecoration = "none";
}

// Funktion zum Anzeigen der Spielerseite und Aktualisierung der Spielerinformationen
function showPlayerPage(playerName) {
  // Spielerseite anzeigen
  //  document.getElementById("table-background").style.display = "none";
  document.getElementById("player-page").style.display = "block";

  // Spielername in der Überschrift anzeigen
  document.getElementById("player-name").innerHTML = playerName;

  // Spielerinformationen aktualisieren
  const playerInfo = playerData[playerName];
  const gameListBody = document.getElementById("game-list-body");
  gameListBody.innerHTML = ""; // Vorherige Einträge löschen

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

    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();

    console.log("Jahr:", year);
    console.log("Monat:", month);
    console.log("Tag:", day);

    sortedRows.sort(function (a, b) {
        var aValue = a.getElementsByTagName("td")[columnIndex].textContent;
        var bValue = b.getElementsByTagName("td")[columnIndex].textContent;

        if (columnIndex === 0) {
            // Sortiere nach datum (newest first)
            var aDateParts = aValue.split(".");
            var bDateParts = bValue.split(".");

            var aYear = parseInt(aDateParts[2]);
            var aMonth = parseInt(aDateParts[1]);
            var aDay = parseInt(aDateParts[0]);

            var bYear = parseInt(bDateParts[2]);
            var bMonth = parseInt(bDateParts[1]);
            var bDay = parseInt(bDateParts[0]);

            // Compare years, then months, then days
            if (bYear !== aYear) {
                return bYear - aYear;
            }
            if (bMonth !== aMonth) {
                return bMonth - aMonth;
            }
            return bDay - aDay;
        } else if (columnIndex === 1) {
            // Sortiere nach level 
            return parseInt(bValue) - parseInt(aValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    for (var i = 0; i < sortedRows.length; i++) {
        tbody.appendChild(sortedRows[i]);
    }
}


// Funktion zum Zurückkehren zur Spieler-Tabelle
function goBackToTable() {
  // Zurück zur Spieler-Tabelle navigieren

  document.getElementById("spieler-tabelle").style.display = "block";
  document.getElementById("player-page").style.display = "none";
  location.reload();
}
