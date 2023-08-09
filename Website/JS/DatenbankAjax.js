// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

function setup() {
  showResult();
}


// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
  alert(event.target.statusText);
}
