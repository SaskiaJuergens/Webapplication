// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

var LevelList = [];

function setup() {
    showPlayer();
}

/**
 * Spieler werden angezeigt
 */
function showPlayer() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", ajaxShowLevel);
    xmlhttp.addEventListener("error", ajaxFehler);

    xmlhttp.open("GET", "../php/playerShow.php");
    xmlhttp.send();
}

//Spieler anzeigen
// die Ajaxanfrage wird in eine Json-Liste umgewandelt
function ajaxShowLevel(event) {
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
        var level = myObj[i]["level"];
        td3.appendChild(document.createTextNode(level));
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }
}

// Falls eine Ajax-Anfrage gescheitert ist ...
function ajaxFehler(event) {
    alert(event.target.statusText);
}