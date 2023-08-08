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
var spielerMail;

//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  checkSession();
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
          spielerId = data.spielerId;
          spielerMail = data.email;
          console.log("Benutzer ist angemeldet"); //angemeldet
          statusAngemeldet = true;
          console.log(statusAngemeldet);
          //hier anmeldung mit profil tauschen

          if (spielerMail != "admin@memory.de") {
            console.log("admin ist nicht angemeldet"); // Der admin ist nicht angemeldet check
            //hier alles was speziell für admin raus
          }
        } else {
          console.log("Benutzer ist nicht angemeldet."); // Der User ist nicht angemeldet check
          //hier alles was User sehen raus
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
