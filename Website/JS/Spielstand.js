// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

var LevelList = [];

function setup() {
  showLevels();
}

/**
 * Karten werden angezeigt
 */
function showLevels() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowLevel);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/levelShow.php");
  xmlhttp.send();
}

//Level anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowLevel(event) {
  var myObj = JSON.parse(event.target.responseText);

  for (var i = 0; i < myObj.length; i++) {
    var level = myObj[i]["Level"];
    var anzahl_karten = myObj[i]["anzahl_karten"];
    var spielZeit = myObj[i]["spielZeit"];

    // Ein Objekt mit title und src erstellen
    var item = {
      level: level,
      anzahl_karten: anzahl_karten,
      spielZeit: spielZeit,
    };

    // Das erstellte Objekt der Liste hinzuf�gen
    LevelList.push(item);
  }
  console.log(LevelList);
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
}
