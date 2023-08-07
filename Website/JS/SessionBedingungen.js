/**
 * Die Anzeige verändert sich was sichtbar ist, je nach Anmeldestauts
 *
 * der Admin sieht am meisten
 *
 * Der User sieht seinen eigenen Account
 *
 * Nicht angemeldete sehen nichts
 */

var spielerList = [];
//spieler der Session
var spielerId;

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  showSpieler();
  checkSession();
}

/**
 * Karten werden angezeigt
 */
function showSpieler() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowSpieler);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/spielerShow.php");
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

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
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
