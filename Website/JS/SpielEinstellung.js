﻿// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

function setup() {
    const submitCard = document.getElementById("insertCard");
    const submitLevel = document.getElementById("insertLevel");
    submitCard.addEventListener("click", function () {
        insertCard();
    });
    submitLevel.addEventListener("click", function () {
        inserLevel();
    });
}

// Registrierung Ajax-Events f�r das Hinzuf�gen einer Karte und sende eine Anfrage
function insertCard() {
    console.log("Test");
    var bildSelect = document.getElementById("bild");
    var artistSelect = document.getElementById("artist");
    var name = document.getElementById("name").value;
    var formData = new FormData();
    var bild = bildSelect.files[0];
    var artist = artistSelect.files[0];
    formData.append("name", name);
    formData.append("artist", artist, artist.name);
    formData.append("bild", bild, bild.name);

    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", ajaxInsertCard); // Corrected the event listener function name
    ajaxRequest.addEventListener("error", ajaxFehler);
    ajaxRequest.open("POST", "../php/card.php");
    ajaxRequest.send(formData);
}

// Registrierung Ajax-Events f�r das Hinzuf�gen einer Karte und sende eine Anfrage
function insertLevel() {
    var level = document.getElementById("level").value;
    var anzahl_Karten = document.getElementById("anzahl_Karten").value;
    var spielZeit = document.getElementById("spielZeit").value;
    var formData = new FormData();
    formData.append("level", level);
    formData.append("anzahl_Karten", anzahl_Karten);
    formData.append("spielZeit", spielZeit);

    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", ajaxInsertKarte); // Corrected the event listener function name
    ajaxRequest.addEventListener("error", ajaxFehler);
    ajaxRequest.open("POST", "../php/level.php");
    ajaxRequest.send(formData);
}

// Falls die Karte erfolgreich eingef�gt wurde ...
function ajaxInsertCard(event) {
    document.getElementById("infoInsertCard").innerHTML = this.responseText;
} // Falls die Level erfolgreich eingef�gt wurde ...
function ajaxInsertCard(event) {
    document.getElementById("infoInsertLevel").innerHTML = this.responseText;
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
    alert(event.target.statusText);
}