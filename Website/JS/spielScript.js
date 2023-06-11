  //hier die fehlenden Bilder einfügen
];
//Eventhandler für HTML
window.addEventListener("load", setup);
function setup() {
  var elem = document.getElementById("start");
  elem.addEventListener("click", SpielStarten);
  var elem = document.getElementById("stop");
  elem.addEventListener("click", SpielStop);
}
//Karten zeichnen lassen
//beim anklicken müssen hier die Bilder erscheinen aus der arraylist items
//src wird später ausgetauscht von items mit endsprechendem Wert
//item muss verdoppelt werden und dann randomly displayed
function drawCards() {
  var ULlist = document.getElementById("cards");
  for (var i = 0; i < items.length * 2; i++) {
    var index = i;
    var x = document.createElement("IMG");
    x.setAttribute("src", "../images/leereKarte.png");
    x.setAttribute("alt", items[0].title);
    x.setAttribute("id", index);
    x.className = "gameCard";
    x.style.width = "30%";