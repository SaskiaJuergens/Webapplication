// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

function setup() {
    showLevel();
    showGame();
    showCard();
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

        tbody.appendChild(tr);
    }
}

/**
 * Spiel werden angezeigt
 */
function showGame() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", ajaxShowGame);
    xmlhttp.addEventListener("error", ajaxFehler);

    xmlhttp.open("GET", "../php/spielShow.php");
    xmlhttp.send();
}

//Spiel anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowGame(event) {
    var myObj = JSON.parse(event.target.responseText);

    // Tabelle-Rumpf
    var tbody = document.getElementById("resultGame");
    for (var i = 0; i < myObj.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var Datetime = myObj[i]["Datetime"];
        td1.appendChild(document.createTextNode(Datetime));
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var level = myObj[i]["level"];
        td2.appendChild(document.createTextNode(level));
        tr.appendChild(td2);
        
        var td3 = document.createElement("td");
        var dauer = myObj[i]["dauer"];
        td3.appendChild(document.createTextNode(dauer));
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        var einzeln = myObj[i]["einzeln"];
        td4.appendChild(document.createTextNode(einzeln));
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        var mitspieler = myObj[i]["mitspieler"];
        td5.appendChild(document.createTextNode(mitspieler));
        tr.appendChild(td5);

        var td6 = document.createElement("td");
        var gewinner = myObj[i]["gewinner"];
        td6.appendChild(document.createTextNode(gewinner));
        tr.appendChild(td6);

        var td7 = document.createElement("td");
        var initiator = myObj[i]["initiator"];
        td7.appendChild(document.createTextNode(initiator));
        tr.appendChild(td7);

        tbody.appendChild(tr);
    }
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

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
    alert(event.target.statusText);
}