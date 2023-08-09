// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

var LevelList = [];

function setup() {
    showLevel();
    showPlayer();
    //hey Tabelle Karte funktioniert jetzt komplett :) unten sind die dazugehörigen funktionen Datenbank Ajax kann komplett raus
    showCard();
}


/**
 * Spieler werden angezeigt
 */
function showPlayer() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", ajaxShowPlayer);
    xmlhttp.addEventListener("error", ajaxFehler);

    xmlhttp.open("GET", "../php/playerShow.php");
    xmlhttp.send();
}

//Spieler anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowPlayer(event) {
    var myObj = JSON.parse(event.target.responseText);

    // Tabelle-Rumpf
    var tbody = document.getElementById("resultSpieler");
    for (var i = 0; i < myObj.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var name = myObj[i]["name"];
        td1.appendChild(document.createTextNode(name));
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var vorname = myObj[i]["Vorname"];
        td2.appendChild(document.createTextNode(vorname));
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        var email = myObj[i]["email"];
        td3.appendChild(document.createTextNode(email));
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        var level = myObj[i]["level"];
        td4.appendChild(document.createTextNode(level));
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}


/**
 * Level werden angezeigt
 */
function showLevel() {
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

    // Tabelle-Rumpf
    var tbody = document.getElementById("resultLevel");
    for (var i = 0; i < myObj.length; i++) {
        var tr = document.createElement("tr");
        tr.id = "levelRow_" + i; // Füge eine eindeutige ID für jede Zeile hinzu

        var td1 = document.createElement("td");
        var level = myObj[i]["level"];
        td1.appendChild(document.createTextNode(level));
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var anzahl_karten = myObj[i]["anzahl_karten"];
        td2.appendChild(document.createTextNode(anzahl_karten));
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        var spielZeit = myObj[i]["spielZeit"];
        td3.appendChild(document.createTextNode(spielZeit));
        tr.appendChild(td3);

        var td4 = document.createElement("td"); // Spalte für Löschen-Button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.addEventListener("click", function () {
            deleteLevel(tr.id);
        });
        td4.appendChild(deleteButton);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}

// JavaScript-Code zum Löschen einer Zeile und der dazugehörigen Daten aus der Datenbank
function deleteLevel(rowId) {
    var confirmation = confirm("Möchtest du diese Karte wirklich löschen?");
    if (confirmation) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener("load", function () {
            var row = document.getElementById(rowId);
            row.parentNode.removeChild(row);
        });
        xmlhttp.addEventListener("error", ajaxFehler);

        xmlhttp.open("POST", "../php/deleteLevel.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("id=" + rowId);
    }
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
    alert(event.target.statusText);
}

// Registrierung Ajax-Events f�r das Anzeigen aller Karte und sende eine Anfrage
function showCard() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", ajaxShowCard);
    xmlhttp.addEventListener("error", ajaxFehler);

    xmlhttp.open("GET", "../php/cardShow.php");
    xmlhttp.send();
}

// Falls die Karten erfolgreicht aus der Datenbank geholt sind ...
function ajaxShowCard(event) {
    var myObj = JSON.parse(event.target.responseText);

    // Tabelle-Rumpf
    var tbody = document.getElementById("resultCard");
    for (var i = 0; i < myObj.length; i++) {
        var tr = document.createElement("tr");
        tr.id = "cardRow_" + i; // Füge eine eindeutige ID für jede Zeile hinzu

        var td1 = document.createElement("td");
        var name = myObj[i]["name"];
        td1.appendChild(document.createTextNode(name));
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var bild = myObj[i]["bild"];
        var img = document.createElement("IMG");
        img.height = 90;
        img.width = 90;
        img.src = bild;
        td2.appendChild(img);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        var artist = myObj[i]["artist"];
        var img = document.createElement("IMG");
        img.height = 90;
        img.width = 90;
        img.src = artist;
        td3.appendChild(img);
        tr.appendChild(td3);

        var td4 = document.createElement("td"); // Spalte für Löschen-Button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Löschen";
        deleteButton.addEventListener("click", function () {
            deleteCard(tr.id);
        });
        td4.appendChild(deleteButton);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}

// JavaScript-Code zum Löschen einer Zeile und der dazugehörigen Daten aus der Datenbank
function deleteCard(rowId) {
    var confirmation = confirm("Möchtest du diese Karte wirklich löschen?");
    if (confirmation) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener("load", function () {
            var row = document.getElementById(rowId);
            row.parentNode.removeChild(row);
        });
        xmlhttp.addEventListener("error", ajaxFehler);

        xmlhttp.open("POST", "../php/deleteCard.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("id=" + rowId);
    }
}

