// Beim Laden der Webseite wird die Funktion setup() aufgerufen
window.addEventListener("load", setup);

function setup() {
  // showResult();
}

// Registrierung Ajax-Events f�r das Anzeigen aller Karte und sende eine Anfrage
function showResult() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", ajaxShowCard);
  xmlhttp.addEventListener("error", ajaxFehler);

  xmlhttp.open("GET", "../php/cardShow.php");
  xmlhttp.send();
}

// Falls die Karten erfolgreicht aus der Datenbank geholt sind ...
function ajaxShowCard(event) {
  var myObj = JSON.parse(event.target.responseText);

  // Tabelle-Kopf
  var thead = document.getElementById("theadCard");
  var trh = document.createElement("tr");
  for (var key in myObj[0]) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(key));
    trh.appendChild(th);
  }
  thead.appendChild(trh);

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
    img.height = 30;
    img.width = 30;
    img.src = bild;
    td2.appendChild(img);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    var artist = myObj[i]["artist"];
    var img = document.createElement("IMG");
    img.height = 30;
    img.width = 30;
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
