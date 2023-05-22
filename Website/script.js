//passwort
document.addEventListener("DOMContentLoaded", function() {
  var passwordInput = document.getElementById("password");
  var confirmPasswordInput = document.getElementById("confirmPassword");

  passwordInput.addEventListener("blur", checkPassword);
  confirmPasswordInput.addEventListener("blur", checkPasswordsMatch);
});

function checkPassword() {
  var password = document.getElementById("password").value;
  var passwordHint = document.getElementById("passwordHint");
  var submitButton = document.getElementById("submitButton");

  // Überprüfung der Passwortlänge und Zeichenanforderungen
  if (password.length < 7 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d{5}/.test(password)) {
    passwordHint.textContent = "Das Passwort muss mindestens 7 Zeichen lang sein, mindestens einen Groß- und einen Kleinbuchstaben sowie mindestens fünf Ziffern enthalten.";
    submitButton.disabled = true;
  } else {
    passwordHint.textContent = "";
    submitButton.disabled = false;
  }
}

function checkPasswordsMatch() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var confirmPasswordHint = document.getElementById("confirmPasswordHint");
  var submitButton = document.getElementById("submitButton");

  // Überprüfung der Passwortübereinstimmung
  if (password !== confirmPassword) {
    confirmPasswordHint.textContent = "Die Passwörter stimmen nicht überein.";
    submitButton.disabled = true;
  } else {
    confirmPasswordHint.textContent = "";
    submitButton.disabled = false;
  }
}


function showPlayerPage(playerName) {
  // Verstecke die Tabelle und zeige die Spielerseite an
  document.getElementById("spieler-tabelle").style.display = "none";
  document.getElementById("player-page").style.display = "block";

  // Setze den Spielername auf der Spielerseite
  document.getElementById("player-name").innerText = playerName;

  // Lade die Spielerdetails asynchron (hier kannst du deine Logik einfügen)
  // Beispiel: Hier wird einfach ein Text angezeigt
  document.getElementById("player-details").innerText = "Hier werden die Details für " + playerName + " angezeigt.";
}

function goBackToTable() {
  // Verstecke die Spielerseite und zeige die Tabelle wieder an
  document.getElementById("player-page").style.display = "none";
  document.getElementById("spieler-tabelle").style.display = "table";
}
