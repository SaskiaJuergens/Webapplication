//passwort
document.addEventListener("DOMContentLoaded", function () {
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
  if (
    password.length < 7 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d{5}/.test(password)
  ) {
    passwordHint.textContent =
      "Das Passwort muss mindestens 7 Zeichen lang sein, mindestens einen Groß- und einen Kleinbuchstaben sowie mindestens fünf Ziffern enthalten.";
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

document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    insertLogin();
    // Registrierung Ajax-Events für das Hinzufügen eines Spielers
    // und send eine Anfrage
    function insertLogin() {
      // var insertButton = document.getElementById("insert");
      // Annahme: Du hast die Spielinformationen in JavaScript-Variablen gespeichert
      var formData = new FormData();

      formData.append("vorname", $("#vorname").val());
      formData.append("nachname", $("#nachname").val());
      formData.append("email", $("#email").val());
      formData.append("password", $("#password").val());
      formData.append("level", $("#level").val());
      formData.append("action", "register");

      var ajaxRequest = new XMLHttpRequest();
      ajaxRequest.addEventListener("load", ajaxInsertSpiel);
      ajaxRequest.addEventListener("error", ajaxFehler);
      ajaxRequest.open("POST", "../php/session.php");
      ajaxRequest.send(formData);
    }

    // Falls das signup erfolgreicht inzugefügt ist ...
    function ajaxInsertSpiel(event) {
      document.getElementById("response").innerHTML = this.responseText;
    }

    // Falls eine Ajax-Anfrage gescheitert ist ...
    function ajaxFehler(event) {
      alert(event.target.statusText);
    }

    // Jetzt kannst du die Werte weiterverarbeiten, z.B. an den Server senden
  });
});
