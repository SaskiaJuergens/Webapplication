// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

var LevelList = [];

function setup() {
    showLevels();

    //hey Tabelle Karte funktioniert jetzt komplett :) unten sind die dazugehörigen funktionen Datenbank Ajax kann komplett raus
    showCard();
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

        tbody.appendChild(tr);
    }
}
